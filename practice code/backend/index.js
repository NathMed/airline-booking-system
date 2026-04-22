// IMPORTS
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");

// ROUTE IMPORTS
const userRoutes = require("./routes/user");
const passengerRoutes = require("./routes/passenger");
const paymentRoutes = require("./routes/payment");
//const bookingRoutes = require("./routes/booking");
//const flightRoutes = require("./routes/flights");
//const bookingPassengerRoutes = require("./routes/bookingPassenger");

// APP INITIALIZATION 
const app = express();

//DATABASE CONNECTION
mongoose.connect(process.env.MONGODB_STRING);
let db = mongoose.connection;
db.on("error", (err) => console.error("Connection error:", err));
db.once("open", () => console.log("Now connected to MongoDB Atlas."));

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// ROUTES
app.use("/users", userRoutes);
app.use("/passengers", passengerRoutes);
app.use("/payments", paymentRoutes);
//app.use("/bookings", bookingRoutes);
//app.use("/flights", flightRoutes);
//app.use("/bookingpassengers", bookingPassengerRoutes);

// SERVER START
if(require.main === module) {
	app.listen(process.env.PORT, () => console.log(`Server running at port ${process.env.PORT}`));
}

module.exports = {app, mongoose};