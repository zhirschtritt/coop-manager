import React from 'react';
import * as firebase from 'firebase';

export default function Home() {
  const logOut = async () => {
    await firebase.auth().signOut();
    alert('fuck off then');
  };

  return (
    <div className="home">
      <header className="flex">
        <h1>Welcome to staff-app {firebase.auth().currentUser.displayName}!</h1>
        <button onClick={logOut}>LogOut</button>
      </header>
    </div>
  );
};
