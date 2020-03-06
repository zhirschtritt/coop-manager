import * as firebaseui from 'firebaseui';
import * as firebase from 'firebase';

type SignInSuccessCallback = firebaseui.auth.Config['callbacks']['signInSuccessWithAuthResult'];


export const firebaseConfig = Object.freeze({
  apiKey: "AIzaSyDCU1kHF15-YovLfCNqk76sG1G2Qv0Uy_w",
  authDomain: "sbk-app-214521.firebaseapp.com",
  databaseURL: "https://sbk-app-214521.firebaseio.com",
  projectId: "sbk-app-214521",
  storageBucket: "sbk-app-214521.appspot.com",
  messagingSenderId: "464256797486",
  appId: "1:464256797486:web:55fea05c0c9dd53eb908bf",
});

export const firebaseUiConfig = (signInSuccessWithAuthResult?: SignInSuccessCallback): firebaseui.auth.Config => {
  return {
    signInSuccessUrl: '/',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    // TODO: terms of service url....
    tosUrl: '<your-tos-url>',
    signInFlow: 'popup',
    // TODO: Privacy policy url/callback
    privacyPolicyUrl: function () {
      window.location.assign('/api/privacy');
    },
    callbacks: {
      signInSuccessWithAuthResult,
      // signInSuccessWithAuthResult: () => {
        //   console.log("HERE");
        //   return true;
        // },
        // function (authResult, redirectUrl) {
          // const user = authResult.user;

          // this is the actual JWT we need to send to api to verify id and authenticate
          // const token = await firebase.auth().currentUser.getIdToken; <
        // const credential = authResult.credential;
        // axios.post('api/members', {credential});

        // // const isNewUser = authResult.additionalUserInfo.isNewUser;
        // // const providerId = authResult.additionalUserInfo.providerId;
        // // const operationType = authResult.operationType;
        // // Do something with the returned AuthResult.
        // // Return type determines whether we continue the redirect automatically
        // // or whether we leave that to developer to handle.
        // return true;
        // },
      // signInFailure: function (error) {
      //   // Some unrecoverable error occurred during sign-in.
      //   // Return a promise when error handling is completed and FirebaseUI
      //   // will reset, clearing any UI. This commonly occurs for error code
      //   // 'firebaseui/anonymous-upgrade-merge-conflict' when merge conflict
      //   // occurs. Check below for more details on this.
      //   return handleUIError(error);
      // },
      uiShown: function () {
        // console.log('LOADED UI');
        // The widget is rendered.
        // Hide the loader.
        // document.getElementById('loader').style.display = 'none';
      },
    },
  };
};
