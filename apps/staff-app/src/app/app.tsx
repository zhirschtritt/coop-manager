import React, {useEffect} from 'react';
import axios from 'axios';
import {StyledFirebaseAuth} from 'react-firebaseui';
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter,
} from "react-router-dom";
import Home from './home';
import {firebaseUiConfig, firebaseConfig} from './firebaseAuth';
import {Store} from './store';
import {initializeApp as initializeFirebaseApp, auth as firebaseAuth} from 'firebase';

initializeFirebaseApp(firebaseConfig);

function PrivateRoute({...props}) {
  const store = Store.useStore();
  if (store.get('currentUser')) {
    return <Route {...props} />;
  }
  return <Redirect to="/login" />;
};

function LogIn() {
  const store = Store.useStore();
  if (store.get('currentUser')) {
    return <Redirect to='/' />;
  }

  return <StyledFirebaseAuth uiConfig={firebaseUiConfig(() => false)} firebaseAuth={firebaseAuth()} />;
};

export default function App() {
  const store = Store.useStore();

  // TODO: make in to useAuth hook (eg. https://dev.to/bmcmahen/using-firebase-with-react-hooks-21ap)
  useEffect(() => {
    async function checkAuthorized(user: firebase.User) {
      if (user && !store.get('currentUser')) {
        const {token, claims} = await user.getIdTokenResult();

        // if user has correct privileges, don't recheck on server
        if (claims.staff) {
          store.set('currentUser')(user);
          return;
        }

        try {
          await axios.post(`/api/auth/login`, null, {params: {token}});
          store.set('currentUser')(user);
        } catch (err) {
          // TODO: create error module or snackbar
          if (err.response.status === 401) {
            console.error(err.response, 'not authorized');
          }
          console.error(err, 'unknown err');
        }
      }
    };

    return firebaseAuth().onAuthStateChanged(checkAuthorized.bind(this)).bind(this);
  }, [store]);

  return (
      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/" exact component={Home} />
          <Route path='/login'>
            <LogIn />
          </Route>
        </Switch>
      </BrowserRouter>
  );
}
