import { Inject, Injectable } from '@nestjs/common';
import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import ThirdPartyPasswordless from 'supertokens-node/recipe/thirdpartypasswordless';
import Dashboard from 'supertokens-node/recipe/dashboard';

import { ConfigInjectionToken, AuthModuleConfig } from '../config.interface';

@Injectable()
export class SupertokensService {
  constructor(@Inject(ConfigInjectionToken) config: AuthModuleConfig) {
    if (!process.env.SUPERTOKENS_DASHBOARD_API_KEY) {
      throw new Error('Missing env variable SUPERTOKENS_DASHBOARD_API_KEY');
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
          contactMethod: 'EMAIL_OR_PHONE',
        }),
        Session.init(),
      ],
    });
  }
}
