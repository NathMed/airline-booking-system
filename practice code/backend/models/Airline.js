const mongoose = require("mongoose");

const airlineSchema = new mongoose.Schema({
	name:{
		type: String,
		required: [true, "Airline name is required"],
		unique: true,
		trim: true
	},
	
	iataCode:{
		type: String,
		required: [true, "2-letter IATA code is required"],
		unique: true,
		uppercase: true,
		minLength: 2,
		maxLength: 2
	},

	logoURL:{
		type: String,
		required: true,
	},

	createdAt: {
		type: Date,
		default: Date.now
	},

	isActive: {
		type: Boolean,
		default: true
	}
});

module.exports = mongoose.model("Airline", airlineSchema);