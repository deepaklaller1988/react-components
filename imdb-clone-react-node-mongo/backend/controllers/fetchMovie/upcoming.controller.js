const UpcomingMovies = require("../../models/upcomingMovieModel");

const upcomingMoviesEntries = async (req, res) => {
  const entries = await UpcomingMovies.find({});
//   console.log(indicators);
  res.send(entries);
};

module.exports = upcomingMoviesEntries;
