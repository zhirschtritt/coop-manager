import React, {useState, useEffect, useImperativeHandle} from 'react';
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
import * as firebase from 'firebase';

firebase.initializeApp(firebaseConfig);

const PrivateRoute = ({...props}) => {
  if (props.loggedIn) {
    console.log('LOGGED IN ROUTE');
    return <Route {...props} />;
  }
  return <Redirect to="/login" />;
};

function LogIn({loggedIn}) {
  if (loggedIn) {
    return <Redirect to='/' />;
  }
  return <StyledFirebaseAuth uiConfig={firebaseUiConfig(() => false)} firebaseAuth={firebase.auth()} />;
};

export default function App() {
  const store = Store.useStore();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const unregister = firebase.auth().onAuthStateChanged((user: firebase.User) => {
      if (user && !store.get('currentUser')) {
        store.set('currentUser')(user);
        setLoggedIn(true);
      } else if (!user) {
        store.set('currentUser')(undefined);
      }
    });

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
