import React, { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

function SignUp() {
  //   const [userName, setUserName] = useState();
  //   const [email, setEmail] = useState();
  //   const [password, setPassword] = useState();

  const [data, setData] = useState({
    email: "",
    password: "",
    passwordVerify: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { getLoggedIn } = useContext(AuthContext);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const saveData = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/auth/";
      const res = await axios.post(url, data);
      await getLoggedIn();
      console.log(res);
      //   if (res.auth) {
      //     setData("");
      //     navigate("/");
      //   }
    } catch (err) {
      if (
        err.response &&
        err.response.status >= 400 &&
        err.response.status <= 500
      ) {
        console.error(err);
        setError(err.response.data.errorMessage);
      }
    }
  };

  console.log(error);

  return (
    <div>
      <div className="text-center">
        <h2>SignUp</h2>
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
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleChange}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Password"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPasswordVerify">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="passwordVerify"
              onChange={handleChange}
              placeholder="Confirm Password"
            />
            {error ? <div className="text-danger">* {error}</div> : ""}
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
