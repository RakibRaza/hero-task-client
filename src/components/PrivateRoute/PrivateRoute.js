import React from "react";
import { Redirect, Route } from "react-router";
import { useAuthContext } from "../../context/AuthContext";

function PrivateRoute({ children, ...rest }) {
  const { currentUserInfo } = useAuthContext();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        currentUserInfo ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
export default PrivateRoute;
