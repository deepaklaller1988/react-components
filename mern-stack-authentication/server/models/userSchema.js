const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
});

const User = mongoose.model("register", userSchema);

const validate = (data) => {
  const authSchema = Joi.object({
    email: Joi.string().email().lowercase().required().label("email"),
    password: Joi.string().min(6).required().label("password"),
    passwordVerify: Joi.any()
      .equal(Joi.ref("password"))
      .required()
      .label("confirm password")
      .messages({ "any.only": "Passwords does not match" }),
  });
  return authSchema.validate(data);
};

module.exports = { User, validate };
