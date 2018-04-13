import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter, connect } from "mirrorx";
import Login from "../containers/Login";
import Home from "../containers/Home";

const PrivateRoute = ({ component: Component, login: isLogin, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLogin ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const Routes = ({ login }) => (
  <Switch>
    <PrivateRoute exact path="/" component={Home} login={login} />
    <Route path="/login" component={Login} />
    <PrivateRoute path="/home" component={Home} login={login} />
    {/*<Route component={NoMatch}/>*/}
  </Switch>
);

export default withRouter(connect(state => state.auth)(Routes));
