const Movies = require("../../models/movieModel");
const User = require("../../models/userModel");

const getCategoryWiseEntry = async (req, res) => {
  console.log(req.query.category);
  const category = req.query.category;
  try {
    if (category === "popular") {
      const popularMovies = await Movies.find({ popularity: { $gt: 1500.0 } });
      // console.log(popularMovies);
      return res.send(popularMovies);
    }
    if (category === "highrated") {
      const popularMovies = await Movies.find({ rating: { $gte: 8.5 } });
      // console.log(popularMovies);
      return res.send(popularMovies);
    }
    if (category === "favorites") {
      const popularMovies = await Movies.find({ vote_count: { $gte: 10000 } });
      // console.log(popularMovies);
      return res.send(popularMovies);
    }
    if (category === "wishlist" && req.query.id) {
      const wishlistMovies = await User.findOne(
        { _id: req.query.id },
        { wishlist: 1 }
      );

      const getMovies = await Movies.find({
        _id: { $in: wishlistMovies["wishlist"] },
      });
      // console.log(getMovies);
      return res.send(getMovies);
    } else {
      return res.send({ error: "Something Went Wrong" });
    }
  } catch (error) {
    res.send(error);
  }
};

module.exports = getCategoryWiseEntry;
