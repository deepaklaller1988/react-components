import { Route, Routes } from "react-router";
import "./App.css";
import Nav from "./components/Nav";
import Products from "./components/Home";
import SignUp from "./components/SignUp/SignUp";
import PrivateComp from "./components/PrivateComp/PrivateComp";
import Login from "./components/login/Login";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route element={<PrivateComp />}>
          <Route path="/" element={<Products />}></Route>
        </Route>

        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
