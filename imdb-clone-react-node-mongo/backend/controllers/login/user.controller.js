const User = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const jwtKey = "ancbhddgfmgsf";

const currentUserController = (req, res) => {
    try {
      const token = req.cookies.token;
      if (!token) return res.json({isLoggedIn: false, user: "User not logged in" });
  
      const verifiedAuth = jwt.verify(token, jwtKey);
    //   req.user = verifiedAuth.user
      res.send({isLoggedIn: true, user: verifiedAuth.user._id });
    } catch (err) {
      res.json({isLoggedIn: false, user: "Something went wrong" });
    }
  };
  
  module.exports = currentUserController;
  