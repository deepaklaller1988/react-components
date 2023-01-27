const Movies = require("../../models/movieModel");

const fetchEntries = async (req, res) => {
  // console.log(req.user._id)
  const indicators = await Movies.find({});
  // console.log(indicators);
  res.send(indicators);
};

module.exports = fetchEntries;
