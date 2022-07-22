import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./authcntxt";

export const ProtectedRoute = ({ children }) => {
    console.log("the current user is ", useAuth())
  const { user } = useAuth();
  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};