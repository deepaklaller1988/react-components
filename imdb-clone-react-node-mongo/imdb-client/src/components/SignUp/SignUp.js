import React, { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import User from "../../context/User";


function SignUp() {
  const {userInfo, getLoggedIn } = useContext(AuthContext);

  const [data, setData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const saveData = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/signup";
      const { data: res } = await axios.post(url, data);
      console.log(res);
      if (res.result) {
        setData("");
        console.log(res.result);
        localStorage.setItem("users", JSON.stringify(res));
        localStorage.setItem("token", JSON.stringify(res.auth));
        
        await User.logged();
        navigate("/");
      } else {
        console.log(res);
        setError(res.customData._tokenResponse.error.message);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="bg-dark bg-gradient" style={{height:"100vh"}}>
      <div className="text-center text-warning">
        <h2>SignUp</h2>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <Form
          style={{
            width: "30%",
            padding: "20px",
            margin: "20px",
            color: "gold",
            fontSize: "larger",
            fontWeight: "bolder",
            borderRadius: "10px",
            backgroundColor: "black",
          }}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleChange}
            />
            <Form.Text className="text-white">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              name="username"
              onChange={handleChange}
              placeholder="Enter Name"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Password"
            />
            {error ? (
              <Form.Text className="text-danger font-weight-bold">
                * {error}
              </Form.Text>
            ) : (
              ""
            )}
          </Form.Group>

          <Button variant="primary" type="submit" onClick={saveData}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default SignUp;
