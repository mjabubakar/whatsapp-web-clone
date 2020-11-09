import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { Auth } from "./util/Auth";

let authenticated: boolean;

Auth() ? (authenticated = true) : (authenticated = false);

const Authenticated = (Component: React.FC) => {
  return authenticated ? <Component /> : <Login />;
};

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/register">
          <Register />
        </Route>

        <Route exact path="/">
          {Authenticated(Home)}
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
