// import React, {useState, useEffect} from 'react';
// import firebaseUiFactory from './firebaseAuth';
// import {useHistory} from 'react-router-dom';
// import * as firebase from 'firebase';
// import './app.less';
// import {Store} from './store';
// import {Redirect} from 'react-router';

// export default function Login() {
//   const history = useHistory();
//   const store = Store.useStore();
//   const ui = firebaseUiFactory.manufactureUi('#firebaseui-auth-container', (authRes) => {
//     if (authRes) {
//       store.set('currentUser')(authRes.user);
//       history.push('/');
//       return false;
//     }
//     return true;
//   });

//   ui.start('#firebaseui-auth-container');

//   const [loggedIn, setLoggedIn] = useState();

//   useEffect(() => {
//     const user = store.get('currentUser');
//     if (user) {
//       setLoggedIn(true);
//     }
//   }, [store]);

//   if (loggedIn) {
//     return <Redirect to='/'></Redirect>;
//   }

//   if (!ui.isPendingRedirect) {
//     return <div id="firebaseui-auth-container"></div>;
//   } else {
//     return <div>Loading...</div>;
//   }
// };
