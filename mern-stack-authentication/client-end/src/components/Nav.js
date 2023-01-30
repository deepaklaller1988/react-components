import React, { useContext } from "react";
import "../App.css";
import AuthContext from "../context/AuthContext";
import LogOutBtn from "./auth/Logout";
import { Link } from "react-router-dom";

export default function Nav() {
  const { loggedIn } = useContext(AuthContext);

  return (
    <div>
      <ul className="nav-bar">
        <li>
          <Link to="/">Home</Link>
        </li>
        {loggedIn === true && (
          <>
            <li>
              <Link to="/customer">Customers</Link>
            </li>
            <LogOutBtn />
          </>
        )}
        {loggedIn === false && (
          <ul className="nav-bar" style={{ textAlign: "right" }}>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        )}
      </ul>
    </div>
  );
}
