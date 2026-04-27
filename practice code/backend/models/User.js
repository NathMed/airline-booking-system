const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, "First Name is Required"]
	},

	lastName: {
		type: String,
		required: [true, "Last Name is Required"]
	},

	gender: {
	    type: String,
	    required: [true, "Gender is Required"],
	    enum: ["Male", "Female"]
	},

	email: {
		type: String,
		required: [true, "Email is Required"],
		unique: true,
		lowercase: true
	},

	password: {
		type: String,
		required: [true, "Password is Required"],
	},

	phone: {
		type: String,
		required: [true, "Mobile Number is Required"],
	},

	isAdmin: {
		type: Boolean,
		default: false
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

module.exports = mongoose.model("User", userSchema);