const User = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const jwtKey = "ancbhddgfmgsf";

const loginController = async (req, res) => {
  if (req.body.email && req.body.password) {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      console.log(user.password);
      if (!validPassword)
        return res.status(401).send({ result: "Invalid Email or Password" });
      jwt.sign({ user }, jwtKey, { expiresIn: "24h" }, (err, token) => {
        if (err) res.send({ result: "Something Went Wrong" });
        res
          .cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
          })
          .send({ id: user._id, auth: token });
      });
      // res.send(user);
    } else {
      res.send({ result: "Email or Password is Incorrect" });
    }
  } else {
    res.send({ result: "Email or Password is required" });
  }
};

module.exports = loginController;
