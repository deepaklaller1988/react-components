const User = require("../../models/userModel");
const Movies = require("../../models/movieModel");


const deleteEntry = async (req, res) => {
  const deleteRes = await User.updateOne(
    { _id: req.body.userId },
    { $pull: { wishlist: req.body.deleteId } }
  );
  
  if(deleteRes){
  const wishlistMovies = await User.findOne(
    { _id: req.body.userId },
    { wishlist: 1 }
  );
console.log(wishlistMovies)
  const getMovies = await Movies.find({
    _id: { $in: wishlistMovies["wishlist"] },
  });
  console.log(getMovies);
  res.send(getMovies);
  }
};

module.exports = deleteEntry;
