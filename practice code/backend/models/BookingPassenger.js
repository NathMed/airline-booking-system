const mongoose = require("mongoose");

const bookingPassengerSchema = new mongoose.Schema({
	bookingId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Booking",
		required: [true, "Booking ID is required"]
	},

	passengerId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Passenger",
		required: [true, "Passenger ID is required"]
	},

	ticketNumber: {
		type: String,
		unique: true,
		required: [true, "Ticket Number is required"]
	},

	isActive: {
		type: Boolean,
		default: true
	},

	createdAt: {
		type: Date,
		default: Date.now
	}
})


module.exports = mongoose.model("BookingPassenger", bookingPassengerSchema);