import React from "react";
import "../App.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FaSearch } from "react-icons/fa";
import Dropdown from 'react-bootstrap/Dropdown';
import User from "../context/User";
import axios from 'axios'

export default function Nav() {
  const navigate = useNavigate();
  
  const logout = async () => {
    const {data: res} = await axios.get("http://localhost:8080/api/logout");
    if(res){
    await User.logged();
    localStorage.clear();
    navigate("/login");}
  };
  return (
    <div>
      <ul className="nav-bar">
        <Link to="/">
          <img
            className="header__icon"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
            alt=""
          />
        </Link>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Dropdown>
      <Dropdown.Toggle variant="black" id="dropdown-basic">
      <GiHamburgerMenu /> Menu

      </Dropdown.Toggle>

      <Dropdown.Menu className="bg-dark shadow-lg
">
        <Dropdown.Item href="/all-movies">All Movies</Dropdown.Item>
        <Dropdown.Item href="/watch-section">Watch Section</Dropdown.Item>
        <Dropdown.Item href="/browse-section">Browse Movies</Dropdown.Item>
        <Dropdown.Item href="/top-rated">Top Movies</Dropdown.Item>
        <Dropdown.Item href="/popular">Popular Movies</Dropdown.Item>
        <Dropdown.Item href="/favorite">Fans Favorite</Dropdown.Item>
        <Dropdown.Item href="/upcoming">Upcoming Movies</Dropdown.Item>

      </Dropdown.Menu>
    </Dropdown>
        </li>
        <li>
          <InputGroup style={{ width: "900px", height: "30px" }}>
            <Form.Control
              placeholder="Search IMDb"
              aria-label="Search IMDb"
              aria-describedby="basic-addon2"
            />
            <Button variant="secondary" id="button-addon2">
              <FaSearch />
            </Button>
          </InputGroup>
        </li>
        <li>
          <Link to="/upcoming">Upcoming Movies</Link>
        </li>
        {User.isLoggedIn ?(
          <>
        <li>
          <Link to="/watchlist">Watchlist</Link>
        </li>
        <li>
          <Link onClick={logout}>Logout</Link>
        </li>
        </>
        ) :(
          <>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        </>
        ) }
      </ul>
    </div>
  );
}
