const mongoose = require("mongoose");
const Joi = require("joi");

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Customer = mongoose.model("testcustomer", customerSchema);

const validate = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required().label("Name"),
  });
  return schema.validate(data);
};

module.exports = { Customer, validate };
