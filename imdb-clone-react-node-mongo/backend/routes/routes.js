const { Router } = require("express");

const fetchEntries = require("../controllers/fetchMovie/fetchMovies.controller");
const loginController = require("../controllers/login/login.controller");
const signupController = require("../controllers/signup/signup.controller");
const categoryController = require("../controllers/fetchMovie/highRatedMovies.controller");
const addToWishlist = require("../controllers/fetchMovie/addToWishlist.controller");
const deleteFromWishlist = require("../controllers/fetchMovie/deleteFromWishlist.controller");
const upcomingMovies = require("../controllers/fetchMovie/upcoming.controller");
const browseMovies = require("../controllers/fetchMovie/browseMovies.controller")
const userController = require("../controllers/login/user.controller");
const logoutController = require("../controllers/login/logout.controller");


const auth = require("../middlewares/auth");


const router = Router();
// router.use(auth);

router.get("/", fetchEntries);
router.post("/login", loginController);
router.post("/signup", signupController);
router.get("/logout", logoutController);
router.get("/user", userController);

router.get("/movies", categoryController);
router.post("/add-to-wishlist",auth, addToWishlist);
router.post("/movies/delete-from-wishlist",auth, deleteFromWishlist);
router.get("/movies/upcoming",auth, upcomingMovies);
router.get("/browse-movies",auth, browseMovies)

// router.post("/", setEntries);

module.exports = router;
