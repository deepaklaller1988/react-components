const router = require("express").Router();
const { Customer, validate } = require("../models/customerSchema");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    const { name } = req.body;
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const newCustomer = new Customer({
      name,
    });

    const savedCustomer = await newCustomer.save();

    res.json(savedCustomer);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const findCustomer = await Customer.find();

    res.json(findCustomer);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;
