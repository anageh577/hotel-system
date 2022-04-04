const express = require("express");
const mongoose = require("mongoose");

// Custom routes ======
const hotels = require("./routes/hotels");
const register = require("./routes/registration");
const login = require("./routes/auth");
const booking = require("./routes/booking");
// Initialize express ====
const app = express();

// Port ====
const port = process.env.PORT || 3000;

// Middle wares ====
app.use(express.json());

const hotelsRoutes = require("./routes/hotels");
// const loginRoutes = require("./routes/login");
const bookingRoutes = require("./routes/booking");
const resgisterRoutes = require("./routes/registration");
app.use(hotelsRoutes);
app.use(resgisterRoutes);
// app.use(loginRoutes);
app.use(bookingRoutes);

// Connect to the database ====
mongoose
  .connect("mongodb://localhost/hotelBooking", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {})
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.status(200).send("App is online");
});
mongoose.set('useCreateIndex', true);

// Start server ===
app.listen(port, () => console.log(`connected to port:${port}`));
