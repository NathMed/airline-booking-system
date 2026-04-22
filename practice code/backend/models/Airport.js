const mongoose = require("mongoose");

const airportSchema = new mongoose.Schema({
	name:{
		type: String,
		required: [true, "Airport name is required"],
		unique: true,
		trim: true
	},

	iataCode:{
		type: String,
		required: [true, "3-letter IATA code is required"],
		unique: true,
		uppercase: true,
		minLength: 3,
		maxLength: 3
	},
	
	city:{
		type: String,
		required: [true, "City is required"],
		trim: true
	},
	
	country:{
		type: String,
		required: [true, "Country is required"],
		trim: true
	},

	isActive:{
		type: Boolean,
		default: true
	},

	createdAt:{
		type: Date,
		default: Date.now
	}
	
});


module.exports = mongoose.model("Airport", airportSchema);