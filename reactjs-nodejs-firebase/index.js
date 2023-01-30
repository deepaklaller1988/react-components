// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const express = require("express");
const cors = require("cors");
const User = require("./config");
const bcrypt = require("bcrypt");
const app = express();
const admin = require("firebase-admin");
const { initializeApp } = require("firebase/app");
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} = require("firebase/auth");

const credentials = require("./fir-practice-28fad-firebase-adminsdk-fc759-29db8d068b.json");

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const firebase = initializeApp(User);

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const db = admin.firestore();

const salt = 10;

const auth = getAuth(firebase);

//authentication

//register/signup
app.post("/signup", async (req, res) => {
  // console.log(req.body);
  if (req.body.password) {
    try {
      let user = await admin.auth().createUser({
        email: req.body.email,
        password: req.body.password,
        emailVerified: false,
        disabled: false,
      });
      res.send({ user, message: "User Created" });
    } catch (error) {
      res.send(error);
    }
  }
});

//user registration
app.post("/register", async (req, res) => {
  // console.log(req.body);
  if (req.body.password) {
    try {
      let { user } = await createUserWithEmailAndPassword(
        auth,
        req.body.email,
        req.body.password
      );
      // console.log(user);
      res.send({ id: user.uid, token: user.stsTokenManager.accessToken });
    } catch (error) {
      res.send(error);
    }
  }
});

// get all users list
app.get("/users", async (req, res) => {
  const usersResult = await admin.auth().listUsers(1000);
  res.json(usersResult.users);
});

//admin login api
app.post("/login", async (req, res) => {
  try {
    const user = await admin.auth().getUserByEmail(req.body.email);
    console.log(user);
    try {
      const token = await admin.auth().createCustomToken(req.body.email);
      res.send({ token, user });
    } catch (e) {
      console.log(e);
      res.send({ e, message: "Error Generating Token!Please try again" });
    }
  } catch (e) {
    res.json({ e, message: "no user record found" });
  }
});

// get single user details
app.get("/user/details", async (req, res) => {
  try {
    const user = await admin.auth().getUserByEmail(req.body.email);
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

//user signin
app.post("/signin", async (req, res) => {
  if (req.body.password && req.body.email) {
    try {
      let { user } = await signInWithEmailAndPassword(
        auth,
        req.body.email,
        req.body.password
      );
      console.log(auth.currentUser);
      // console.log(user.stsTokenManager.accessToken);
      res.send({ id: user.uid, token: user.stsTokenManager.accessToken });
    } catch (error) {
      res.send(error);
    }
  }
});

//user signin
app.post("/signout", async (req, res) => {
  try {
    let user = await signOut(auth);
    console.log(user);
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user.email + " is logged in!");
  } else {
    console.log("User is logged out!");
  }
});

// normal Rest API using firestore

//Create
app.post("/create", async (req, res) => {
  try {
    console.log(req.body);
    const id = req.body.email;
    const userData = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };
    //for using own document id
    // const response = db.collection("users").doc(id).set(userData);

    //for generating document unique id
    const response = await db.collection("users").add(userData);

    res.send(response);
  } catch (error) {
    res.send(error);
  }
});

//read
app.get("/read", async (req, res) => {
  try {
    const resData = await db.collection("users").get();
    let resArr = [];
    resData.forEach((doc) => {
      resArr.push(doc.data());
      console.log(doc.data());
    });
    res.send(resArr);
  } catch (error) {
    res.send(error);
  }
});

// data of particular document
app.get("/read/:id", async (req, res) => {
  try {
    const resData = await db.collection("users").doc(req.params.id).get();
    console.log(resData.data());
    res.send(resData.data());
  } catch (error) {
    res.send(error);
  }
});

//update
app.put("/update/:id", async (req, res) => {
  try {
    const resData = await db
      .collection("users")
      .doc(req.params.id)
      .update(req.body);
    console.log(resData);
    res.send(resData);
  } catch (error) {
    res.send(error);
  }
});

//delete
app.delete("/delete/:id", async (req, res) => {
  try {
    const resData = await db.collection("users").doc(req.params.id).delete();
    console.log(resData);
    res.send(resData);
  } catch (error) {
    res.send(error);
  }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
