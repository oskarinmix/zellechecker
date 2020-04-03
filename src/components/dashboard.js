import React from "react";
import App from '../auth/auth'
const Dashbord = () => {
  return (
    <React.Fragment>
      <h1> Dashbord </h1>
      <button onClick={() => App.auth().signOut()}>Sign out</button>
    </React.Fragment>
  );
};

export default Dashbord;
