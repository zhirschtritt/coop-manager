import { admin_directory_v1, Common as GoogleCommon, google } from 'googleapis';
import supertokens from 'supertokens-node';
import { EmailDeliveryInterface } from 'supertokens-node/lib/build/ingredients/emaildelivery/types';
import { TypePasswordlessEmailDeliveryInput } from 'supertokens-node/lib/build/recipe/passwordless/types';
import Dashboard from 'supertokens-node/recipe/dashboard';
import { SMTPService } from 'supertokens-node/recipe/passwordless/emaildelivery';
import Session from 'supertokens-node/recipe/session';
import ThirdPartyPasswordless from 'supertokens-node/recipe/thirdpartypasswordless';

import { Inject, Injectable, OnModuleInit } from '@nestjs/common';

import { AuthModuleConfig, ConfigInjectionToken } from '../config.interface';

@Injectable()
export class SupertokensService implements OnModuleInit {
  constructor(@Inject(ConfigInjectionToken) config: AuthModuleConfig) {
    if (!process.env.SUPERTOKENS_DASHBOARD_API_KEY) {
      throw new Error('Missing env variable SUPERTOKENS_DASHBOARD_API_KEY');
    }

    let sendGridSmtp: EmailDeliveryInterface<TypePasswordlessEmailDeliveryInput> | undefined;
    if (process.env.SENDGRID_SMTP_PASS) {
      sendGridSmtp = new SMTPService({
        smtpSettings: {
          host: 'smtp.sendgrid.net',
          authUsername: 'apikey',
          password: process.env.SENDGRID_SMTP_PASS,
          port: 465,
          from: {
            name: 'Bike Coop Manager Auth',
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            email: process.env.GOOGLE_ADMIN_EMAIL!,
          },
          secure: true,
        },
      });
    }

    supertokens.init({
      appInfo: config.appInfo,
      supertokens: {
        connectionURI: config.connectionURI,
        apiKey: config.apiKey,
      },
      recipeList: [
        Dashboard.init({
          apiKey: process.env.SUPERTOKENS_DASHBOARD_API_KEY,
        }),
        ThirdPartyPasswordless.init({
          flowType: 'MAGIC_LINK',
          contactMethod: 'EMAIL',
          providers: [],
          emailDelivery: {
            service: sendGridSmtp,
          },
          override: {
            apis: (original: ThirdPartyPasswordless.APIInterface) => {
              return {
                ...original,
                createCodePOST: async (input) => {
                  if (original.createCodePOST === undefined) {
                    throw Error('Should never come here');
                  }

                  if (!('email' in input)) {
                    throw new Error('Must sign up with email!');
                  }

                  // If coop uses google groups to manage membership status,
                  // check with google admin api
                  const staffGroupKey = process.env.GOOGLE_GROUP_KEY_STAFF;
                  if (staffGroupKey) {
                    const directoryApiClient = google.admin({ version: 'directory_v1' });

                    let googleGroupMember: admin_directory_v1.Schema$Member;
                    try {
                      const { data } = await directoryApiClient.members.get({
                        groupKey: staffGroupKey,
                        memberKey: input.email,
                      });
                      googleGroupMember = data;
                    } catch (err: any) {
                      const gaxiosErr: GoogleCommon.GaxiosError<admin_directory_v1.Schema$Member> = err;
                      if (gaxiosErr.code && Number.parseInt(gaxiosErr.code) === 404) {
                        return {
                          status: 'GENERAL_ERROR',
                          message: 'Email is not associated with any member in "staff" google group',
                        };
                      }
                      // TODO: log error details here and report bug to monitoring service
                      return {
                        status: 'GENERAL_ERROR',
                        message: 'Unknown error contacting google workspace admin API',
                      };
                    }

                    if (googleGroupMember.status !== 'ACTIVE') {
                      return {
                        status: 'GENERAL_ERROR',
                        message: 'Member must have status ACTIVE in "staff" google group',
                      };
                    }
                  } else {
                    // else confirm user is already pre-registered with supertokens
                    const [existingUser] = await ThirdPartyPasswordless.getUsersByEmail(input.email);

                    // if a user with this email doesn't already exist and we are not
                    // checking against an existing external staff list, return error
                    if (!existingUser) {
                      return {
                        status: 'GENERAL_ERROR',
                        message: 'Email is not associated with registered user',
                      };
                    }
                  }

                  return await original.createCodePOST(input);
                },
              };
            },
          },
        }),
        Session.init(),
      ],
    });
  }

  async onModuleInit() {
    if (process.env.GOOGLE_GROUP_KEY_STAFF) {
      const authClient = await google.auth.getClient({
        credentials: {
          client_email: process.env.GOOGLE_AUTH_CLIENT_EMAIL,
          private_key: process.env.GOOGLE_AUTH_PRIVATE_KEY?.replace(/\\n/gm, '\n'),
        },
        scopes: ['https://www.googleapis.com/auth/admin.directory.group.member'],
        clientOptions: { subject: process.env.GOOGLE_ADMIN_EMAIL },
      });
      google.options({ auth: authClient });
    }
  }
}
