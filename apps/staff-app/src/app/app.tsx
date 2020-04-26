import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {StyledFirebaseAuth} from 'react-firebaseui';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from './home';
import {firebaseUiConfig, firebaseConfig} from './firebaseAuth';
import {Store} from './store';
import {initializeApp as initializeFirebaseApp, auth as firebaseAuth} from 'firebase';

initializeFirebaseApp(firebaseConfig);

function PrivateRoute({...props}) {
  if (props.loggedIn) {
    return <Route {...props} />;
  }
  return <Redirect to="/login" />;
};

function LogIn({loggedIn}) {
  if (loggedIn) {
    return <Redirect to='/' />;
  }
  return <StyledFirebaseAuth uiConfig={firebaseUiConfig(() => false)} firebaseAuth={firebaseAuth()} />;
};

export default function App() {
  const store = Store.useStore();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthorized = async (user: firebase.User) => {
      if (user && !store.get('currentUser')) {
        const token = await user.getIdToken();
        // TODO: wrap in api layer and use common types for req body
        const res = await axios.post(`/api/auth/login`, null, {params: {token}});
        if (res?.data?.isAuthorized) {
          store.set('currentUser')(user);
          setLoggedIn(true);
        }
      }
    };

    const unregister = firebaseAuth().onAuthStateChanged(checkAuthorized);

    return unregister;
  }, [store, loggedIn]);

  return (
      <Router>
        <Switch>
          <Route path='/login'>
            <LogIn loggedIn={loggedIn} />
          </Route>
          <PrivateRoute path="/" loggedIn={loggedIn} component={Home} />
        </Switch>
      </Router>
  );
}
