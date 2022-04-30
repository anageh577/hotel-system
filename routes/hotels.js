const express = require("express");
const Router = new express.Router();
const auth = require("../middleware/authorization");
const admin = require("../middleware/administration");

// Custom models =====
const { Hotel, validate } = require("../models/hotel");

Router.get("/testhotel",[auth, admin], async (req, res) => {
  const hotel = new Hotel(req.body);
  const results = await hotel.save();
  res.status(200).send(results);
});
Router.get("/get-all-hotels", async (req, res) => {
  const hotels = await Hotel.find();
  if (hotels.length < 1)
    return res.status(200).send("There are no hotels listed at the moment");
  res.status(200).send(hotels);
});

Router.post("/add-hotel", [auth, admin], async (req, res) => {
  const hotel = new Hotel(req.body);
  const results = await hotel.save();
  res.status(200).send(results);
  // validate the body of request
  // validate(req.body)
  //   .then((data) => {
  //     createHotel(data);
  //   })
  //   .catch((err) => {
  //     res.send(err.details[0].message);
  //   });
});

Router.get("/gethotel-by-id/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel)
      return res
        .status(404)
        .send({ message: "There is no hotel with that given ID" });
    res.status(200).send(hotel);
  } catch (err) {
    console.error(err);
  }
});

Router.put("edit-hotel/:id", [auth, admin], (req, res) => {
  const editHotel = async (obj) => {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, obj, {
      new: true,
    });
    res.status(200).send(hotel);
  };

  validate(req.body)
    .then((data) => {
      editHotel(data);
    })
    .catch((err) => {
      res.send(err.details[0].message);
    });
});

Router.delete("delete-hotel/:id", [auth, admin], async (req, res) => {
  const results = await Hotel.findByIdAndDelete(req.params.id);
  if (!results) return res.status(404).send("There is no hotel with that id");

  res.status(200).send("Deleted succesfully");
});

module.exports = Router;
