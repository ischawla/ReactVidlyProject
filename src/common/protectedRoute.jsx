import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../services/authServices";

//{...rest} refers any other parameter passing to Route
//reason we are renaming component to Component because Reacts looks for 'Component' while returning.

//<Redirect to=""> : 'to' can be passed in two ways: 1. as a String   2. or as an Object (which whould have the current location)

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  return (
    <Route
      path={path}
      {...rest}
      render={props => {
        console.log(props);
        if (!auth.getCurrentUser())
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
