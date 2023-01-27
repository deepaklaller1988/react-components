const User = require("../../models/userModel");
const Movies = require("../../models/movieModel");

const setEntries = async (req, res) => {
  try{
    const alreadyAdded = await User.count(
      { _id: req.body.userId ,
      wishlist: { $in: [req.body.movieId] }}
    )
    if(alreadyAdded){
      console.log(alreadyAdded);
      return res.send("Already Added")
    }
    else{  
  const addedList = await User.updateOne(
    { _id: req.body.userId },
    { $push: { wishlist: req.body.movieId } }
  );
  console.log(addedList);
  if(addedList){
    const wishlistMovies = await User.findOne(
      { _id: req.body.userId },
      { wishlist: 1 }
    );
  
    const getMovies = await Movies.find({
      _id: { $in: wishlistMovies["wishlist"] },
    });

    res.send(getMovies);
  //   }
    }
  }
}
  catch(error){
    res.send(error)
  }
};

module.exports = setEntries;
