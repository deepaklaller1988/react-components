import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { getLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/auth/login";
      const res = await axios.post(url, data);
      console.log(res);
      if (res) {
        console.log(res);
        await getLoggedIn();
        setError("");
        navigate("/");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.errorMessage);
      }
    }
  };

  return (
    <>
      <div>
        <div className="text-center">
          <h1>Login</h1>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <Form
            style={{
              width: "30%",
              padding: "20px",
              margin: "20px",
              backgroundColor: "rgb(200, 255, 127)",
            }}
          >
            <Form.Group className="mb-3" controlId="formLoginEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formLoginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Password"
              />
              {error ? (
                <Form.Text className="text-muted">* {error}</Form.Text>
              ) : (
                ""
              )}
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleLogin}>
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Login;
