import ThirdPartyPasswordlessReact from 'supertokens-auth-react/recipe/thirdpartypasswordless';
import SessionReact from 'supertokens-auth-react/recipe/session';
import Router from 'next/router';

const appInfo = {
  //  https://supertokens.com/docs/thirdpartyemailpassword/appinfo
  appName: 'bike-coop-manager',
  apiDomain: 'http://localhost:5020',
  websiteDomain: 'http://localhost:3000',
  apiBasePath: '/api/auth',
  websiteBasePath: '/auth',
};

export const frontendConfig = () => ({
  appInfo,
  recipeList: [
    ThirdPartyPasswordlessReact.init({
      contactMethod: 'EMAIL_OR_PHONE',
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
