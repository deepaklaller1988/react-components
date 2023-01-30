import { Route, Routes } from "react-router";
import { useContext } from "react";
import "./App.css";
import Nav from "./components/Nav";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import Customers from "./components/customer/Customers";
import AuthContext from "./context/AuthContext";

function App() {
  const { loggedIn } = useContext(AuthContext);
  //   console.log(valueContext.loggedIn);
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<div>Home</div>}></Route>
        {loggedIn === true && (
          <>
            <Route path="/customer" element={<Customers />}></Route>
          </>
        )}
        {loggedIn === false && (
          <>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
