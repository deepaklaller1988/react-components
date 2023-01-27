import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import User from "../../context/User";

function PrivateComp() {
  return User.isLoggedIn ? <Outlet /> : <Navigate to="login" />;
}

export default PrivateComp;
