const mongoose = require("mongoose");

const aircraftSchema = new mongoose.Schema({
	airlineId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Airline",
		required: true
	},

	model: {
		type: String,
		required: [true, "Input aircraft model"],
		trim: true
	},

	totalSeats: {
		type: Number,
		required: [true, "Input total seat number"],
		min: [150, "Aircraft must have at least 150 seats"],
		max: [250, "Aircraft must have at most 250 seats"]
	},

	isActive: {
		type: Boolean,
		default: true
	},

	createdAt: {
		type: Date,
		default: Date.now
	} 
});



module.exports = mongoose.model("Aircraft", aircraftSchema);