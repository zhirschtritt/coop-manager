import { Inject, Injectable } from '@nestjs/common';
import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import ThirdPartyPasswordless from 'supertokens-node/recipe/thirdpartypasswordless';
import Dashboard from 'supertokens-node/recipe/dashboard';
import { SMTPService } from 'supertokens-node/recipe/passwordless/emaildelivery';

import { ConfigInjectionToken, AuthModuleConfig } from '../config.interface';

@Injectable()
export class SupertokensService {
  constructor(@Inject(ConfigInjectionToken) config: AuthModuleConfig) {
    if (!process.env.SUPERTOKENS_DASHBOARD_API_KEY) {
      throw new Error('Missing env variable SUPERTOKENS_DASHBOARD_API_KEY');
    }
    if (!process.env.SENDGRID_SMTP_PASS) {
      throw new Error('Missing env variable SENDGRID_SMTP_PASS');
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
          flowType: 'USER_INPUT_CODE_AND_MAGIC_LINK',
          contactMethod: 'EMAIL',
          providers: [],
          emailDelivery: {
            service: new SMTPService({
              smtpSettings: {
                host: 'smtp.sendgrid.net',
                authUsername: 'apikey',
                password: process.env.SENDGRID_SMTP_PASS,
                port: 465,
                from: {
                  name: 'Bike Coop Manager Auth',
                  email: 'auth@somervillebikekitchen.org',
                },
                secure: true,
              },
            }),
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

                  // TODO: check if email is in staff/volunteer/etc google group
                  // or just in environmental variable for starters

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
}
