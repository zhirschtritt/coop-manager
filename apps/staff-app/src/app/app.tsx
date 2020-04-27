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

  useEffect(() => {
    const checkAuthorized = async (user: firebase.User) => {
      if (user && !store.get('currentUser')) {
        const token = await user.getIdToken();
        // TODO: wrap in api layer and use common types for req body
        const res = await axios.post(`/api/auth/login`, null, {params: {token}});
        if (res?.data?.isAuthorized) {
          store.set('currentUser')(user);
        }
      }
    };

    const unregister = firebaseAuth().onAuthStateChanged(checkAuthorized);

    return unregister;
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
