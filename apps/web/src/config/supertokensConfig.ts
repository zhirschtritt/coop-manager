import ThirdPartyPasswordlessReact from 'supertokens-auth-react/recipe/thirdpartypasswordless';
import SessionReact from 'supertokens-auth-react/recipe/session';
import Router from 'next/router';
import { SuperTokensConfig } from 'supertokens-auth-react/lib/build/types';

const appInfo = {
  //  https://supertokens.com/docs/thirdpartyemailpassword/appinfo
  appName: 'bike-coop-manager',
  apiDomain: 'http://localhost:5020',
  websiteDomain: 'http://localhost:3000',
  apiBasePath: '/api/auth',
  websiteBasePath: '/auth',
};

export const frontendConfig = (): SuperTokensConfig => ({
  appInfo,
  recipeList: [
    ThirdPartyPasswordlessReact.init({
      contactMethod: 'EMAIL',
      // signInUpFeature: {
      //   providers: [
      //     ThirdPartyPasswordlessReact.Google.init(),
      //     ThirdPartyPasswordlessReact.Apple.init(),
      //   ],
      // },
    }),
    SessionReact.init(),
  ],
  windowHandler: (oI: any) => ({
    ...oI,
    location: {
      ...oI.location,
      setHref: (href: string) => {
        Router.push(href);
      },
    },
  }),
});
