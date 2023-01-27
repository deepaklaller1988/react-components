import { Route, Routes } from "react-router";
import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import Nav from "./components/Nav";
import Products from "./components/Home";
import SignUp from "./components/SignUp/SignUp";
import PrivateComp from "./components/PrivateComp/PrivateComp";
import Watchlist from "./components/list/Watchlist";
import WatchSection from "./components/list/WatchSection";
import BrowseSection from "./components/list/BrowseSection";
import Upcoming from "./components/list/Upcoming";
import Login from "./components/login/Login";
import AllMovies from "./components/list/AllMovies";
import Category from "./components/list/Category";
import axios from "axios";
import AuthContext from "./context/AuthContext";
import { AuthContextProvider } from "./context/AuthContext";
import User from "./context/User";
import Logout from "./components/login/Logout";

axios.defaults.withCredentials = true;

function App() {
  // const {userInfo, getLoggedIn } = useContext(AuthContext);
  const [user, setUser] = useState();
  
  // User.logged()

  useEffect(() => {
   User.logged()
   .then(data=> setUser(data))
  }, []);

  if (!user) {
    console.log(user)
    return <div>Loading...</div>;
  }


  return (
    <AuthContextProvider>
    <div className="App bg-black">
      <Nav />
      <Routes>
        <Route path="/" element={<Products />}></Route>

         <Route element={<PrivateComp />}>
        {/* <Route path="/" element={<Products />}></Route> */}
        <Route path="/all-movies" element={<AllMovies />}></Route>
        <Route path="/top-rated" element={<Category category="highrated" />}></Route>
        <Route path="/popular" element={<Category category="popular" />}></Route>
        <Route path="/favorite" element={<Category category="favorites" />}></Route>
        <Route path="/watchlist" element={<Watchlist />}></Route>
        <Route path="/watch-section" element={<WatchSection />}></Route>
        <Route path="/browse-section" element={<BrowseSection />}></Route>
        <Route path="/upcoming" element={<Upcoming />}></Route>
        </Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
      </Routes>
    </div>
    </AuthContextProvider>
  );
}

export default App;
