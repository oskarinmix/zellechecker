import React from "react";
import Login from "./components/login";
import Home from "./components/home";
import Register from "./components/register";
import Dashboard from "./components/dashboard";
import { AuthProvider } from "./components/Auth";
import { Route, BrowserRouter as Router } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/register" component={Register}></Route>
        <PrivateRoute
          exact
          path="/dashboard"
          component={Dashboard}
        ></PrivateRoute>
      </Router>
    </AuthProvider>
  );
}

export default App;
