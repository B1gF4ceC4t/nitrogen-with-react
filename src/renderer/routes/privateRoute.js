import React, { Component } from "react";
import { Switch, Route, Redirect } from "mirrorx";

const PrivateRoute = ({
  component: Component,
  login: isLogin,
  root,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      isLogin ? (
        root ? (
          <Redirect
            to={{
              pathname: "/main",
              state: { from: props.location }
            }}
          />
        ) : (
          <Component {...props} />
        )
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

export default PrivateRoute;
