const User = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const jwtKey = "ancbhddgfmgsf";

const signUpEntry = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    console.log(existingUser);

    if (existingUser) {
      res.send({ message: "User already exists" });
    } else {
      if (req.body.password) {
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        let result = new User({ ...req.body, password: hashPassword });
        let user = await result.save();
        console.log(user);
        user = user.toObject();
        delete user.password;
        delete user.username;
        const token =  jwt.sign({ user }, jwtKey);
        res
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
        });
        res.send({ id: user._id, auth: token });
        
      }
    }
  } catch (error) {
    res.send(error);
  }
};

module.exports = signUpEntry;
