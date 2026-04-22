const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		default: null
	}, 

	guestEmail: {
		type: String,
		default: null,		
		lowercase: true
	},

	flightId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Flight",
		required: [true, "Flight ID is required"]
	},

	bookingReference: {
		type: String,
		required: [true, "Booking Reference is Required"],
		unique: true
	},

	status: {
		type: String,
		enum: ["pending", "confirmed", "cancelled"],
		default: "pending",
	},

	totalAmount: {
		type: Number,
		min: [0, "Number must not be negative"],
		required: true
	},

	bookedAt: {
		type: Date,
		default: Date.now
	},

	isActive: {
		type: Boolean,
		default: true
	}
});


module.exports = mongoose.model("Booking", bookingSchema);