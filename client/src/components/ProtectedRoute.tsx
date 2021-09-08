import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { RootState } from "../app/store";

export const ProtectedRoute: React.FC<RouteProps> = (props) => {
  const user = useSelector((state: RootState) => state.auth);
  if (user.user == null) return <Redirect to="/login" />;

  return <Route {...props} />;
};

export default ProtectedRoute;
