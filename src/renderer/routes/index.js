import React, { component } from "react";
import { Switch, Route } from "mirrorx";
import Login from "../containers/Login";
import Home from "../containers/Home";

export default (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/home" component={Home} />
    {/*<Route component={NoMatch}/>*/}
  </Switch>
);
