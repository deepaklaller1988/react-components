const mongoose = require("mongoose");
const movieSchema = mongoose.Schema({
  backdrop_path: String,
  genre_ids: Array,
  id: String,
  genre: Array,
  original_language: String,
  original_title: String,
  overview: String,
  popularity: Number,
  poster_path: String,
  release_date: String,
  title: String,
  video: Boolean,
  rating: Number,
  vote_count: Number,
});

module.exports = mongoose.model("movies", movieSchema);
