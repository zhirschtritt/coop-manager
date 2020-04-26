import React from 'react';
import {Store} from './store';

export default function Home() {
  const store = Store.useStore();
  const user = store.get('currentUser');

  const onLogOut = () => {
    store.set('currentUser')(undefined);
  };

  return (
    <div className="home">
    <header className="flex">
      <h1>Welcome to staff-app {user.displayName.split(' ')[0]}!</h1>
      <img src={user.photoURL} alt="userPhoto"></img>
      <button onClick={onLogOut}>LogOut</button>
    </header>
  </div>
  );
};
