import axios from "axios";
import React, { useState, useEffect, createContext } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(undefined);

  useEffect(() => {
    getLoggedIn();
  }, []);

  const getLoggedIn = async () => {
    const res = await axios.get("http://localhost:5000/auth/loggedIn");
    console.log(res);
    setLoggedIn(res.data);
  };
  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
