const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

const hotelsRoutes = require("./routes/hotels");
const bookingRoutes = require("./routes/booking");
const resgisterRoutes = require("./routes/registration");
const authlogin = require("./routes/auth");
app.use(hotelsRoutes);
app.use(resgisterRoutes);
app.use(bookingRoutes);
app.use(authlogin);

mongoose
  .connect("mongodb://localhost/hotelBooking", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {})
  .catch((err) => console.error(err));

mongoose.set("useCreateIndex", true);
app.get("/", (req, res) => {
  res.status(200).send("App is online");
});
app.get("*", (req, res) => {
  res.send({ error: "No such api" });
});


// Start server ===
app.listen(port, () => console.log(`connected to port:${port}`));
