const express = require("express");
const Router = new express.Router();
const bcrypt = require("bcrypt");
const Joi = require("joi");

// Custom modules ===
const { User } = require("../models/user");
const generateToken = require("../logic");

Router.post("/login", (req, res) => {
  const validateFunction = (data) => {
    const schema = {
      email: Joi.string().required().min(5),
      password: Joi.string().required().min(6),
    };
    return Joi.validate(data, schema);
  };

  const loginUser = async (obj) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password");

    const results = await bcrypt.compare(req.body.password, user.password);
    if (!results) return res.status(400).send("Invalid email or password");
    console.log(user);
    const token = generateToken(user);
    res.status(200).send({
      name: user.name,
      email: user.email,
      _id: user._id,
      token: token,
    });
  };

  validateFunction(req.body)
    .then((data) => {
      loginUser(data);
    })
    .catch((err) => {
      res.send(err.details[0].message);
    });
});

module.exports = Router;
