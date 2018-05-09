import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter, connect } from "mirrorx";
import PrivateRoute from "./privateRoute";
import Login from "containers/Login";
import Main from "containers/Main";

const Routes = ({ login }) => (
  <Switch>
    <PrivateRoute exact path="/" component={Login} login={login} root={true}/>
    <Route path="/login" component={Login} />
    <PrivateRoute path="/main" component={Main} login={login} />
    {/*<Route component={NoMatch}/>*/}
  </Switch>
);

export default withRouter(connect(state => state.auth)(Routes));
