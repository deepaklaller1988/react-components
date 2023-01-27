const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  email: String,
  username: String,
  password: String,
  wishlist: Array,
});

module.exports = mongoose.model("signup", userSchema);
