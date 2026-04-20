const mongoose = require("mongoose");

const passengerSchema = new mongoose.Schema({
	userId:{
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		default: null
	},

	firstName: {
		type: String,
		required: [true, "First Name is Required"]
	},

	lastName: {
		type: String,
		required: [true, "Last Name is Required"]
	},

	dateOfBirth: {
		type: Date,
		required: [true, "Date of birth is Required"]
	},

	email: {
		type: String,
		required: [true, "Email is Required"],
		unique: true,
		lowercase: true
	},

	nationality: {
		type: String,
		required: [true, "Nationality is Required"]
	},

	passportNumber: {
		type: String,
		required: [true, "Passport number is Required"],
		unique: true
	},

	passportExpiry: {
		type: Date,
		required: [true, "Passport expiry date is Required"]
	},
	
	phone: {
		type: String,
		required: [true, "Mobile Number is Required"],
	},

	isProfileSaved: {
		type: Boolean,
		default: false
	},

	createdAt: {
		type: Date,
		default: Date.now
	},

});

module.exports = mongoose.model("Passenger", passengerSchema);