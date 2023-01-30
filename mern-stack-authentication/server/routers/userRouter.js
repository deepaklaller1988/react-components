const { User, validate } = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

//signup
router.post("/", async (req, res) => {
  try {
    const { email, password, passwordVerify } = req.body;

    const { error } = validate(req.body);
    if (error) console.log(error);
    return res.status(400).json({ errorMessage: error.details[0].message });

    // validation

    // if (!email || !password || !passwordVerify)
    //   return res
    //     .status(400)
    //     .json({ errorMessage: "Please enter all required fields." });

    // if (password.length < 6)
    //   return res.status(400).json({
    //     errorMessage: "Please enter a password of at least 6 characters.",
    //   });

    // if (password !== passwordVerify)
    //   return res.status(400).json({
    //     errorMessage: "Please enter the same password twice.",
    //   });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({
        errorMessage: "An account with this email already exists.",
      });

    //hash password
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      email: email,
      passwordHash: passwordHash,
    });

    const saveUser = await newUser.save();

    //jwt generation
    const token = jwt.sign({ user: saveUser._id }, process.env.JWT_SECRET);
    // console.log(token);

    //send token to cookie httpOnly
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .send();
  } catch (err) {
    res.status(500).send();
    console.log(err);
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({
        errorMessage: "All fields are required",
      });

    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(401).json({
        errorMessage: "User doesn't exist",
      });

    const correctPassword = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );

    if (!correctPassword)
      return res.status(401).json({ errorMessage: "Wrong email or password." });

    //jwt generation
    const token = jwt.sign({ user: existingUser._id }, process.env.JWT_SECRET);
    // console.log(token);
    //send token to cookie httpOnly
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

//logout
router.get("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: "none",
    })
    .send();
});

router.get("/loggedIn", (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json(false);

    jwt.verify(token, process.env.JWT_SECRET);

    res.send(true);
  } catch (err) {
    res.json(false);
  }
});

module.exports = router;
