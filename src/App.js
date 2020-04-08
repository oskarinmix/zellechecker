import React from "react";
import Login from "./components/login";
import Home from "./components/home";
import Register from "./components/register";
import Dashboard from "./components/dashboard";
import { AuthProvider } from "./components/Auth";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Fourohfour from "./components/fourohfour";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <PrivateRoute path="/dashboard" component={Dashboard}></PrivateRoute>
          <Route component={Fourohfour}></Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
