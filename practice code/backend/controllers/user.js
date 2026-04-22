const User = require("../models/User");
const { errorHandler } = require("../auth");
const bcrypt = require("bcryptjs");
const auth = require("../auth");

// USER LEVEL ACCESS
module.exports.registerUser = (req, res) => {
	if (!req.body.firstName || req.body.firstName.trim() === "") {
		return res.status(400).send({ message: "First name is required" });
	} else if (!req.body.lastName || req.body.lastName.trim() === "") {
		return res.status(400).send({ message: "Last name is required" });
	} else if (!req.body.email.includes("@")) {
		return res.status(400).send({ message: "Incorrect email format"});
	} else if (req.body.password.length < 8) {
		return res.status(400).send({ message: "Password must be at least 8 characters"})
	} else if (!req.body.phone || req.body.phone.length !==11){
		return res.status(400).send({ message: "Phone number must be 11 digits"})
	}
	return User.findOne({ email: req.body.email})
		.then((existingUser) =>{
			if (existingUser) {
				return res.status(409).send({ message: "Email already registered"});
			}

			let newUser = new User({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password, 10),
			phone: req.body.phone,
			isAdmin: false
			});

			return newUser.save()
				.then((result) => res.status(201).send({ message: "User registered successfully!"}))
			})
			.catch(err => errorHandler(err, req, res));
};

module.exports.loginUser =(req, res) => {
	if (req.body.email.includes("@")) {
		return User.findOne({ email: req.body.email })
		.then(result => {
			if (result === null) {
				return res.status(404).send({ message: "Email not found"});
			} else if (!result.isActive) {
				return res.status(403).send({ message: "Account is deactivated. Please contact support."})
			} else {
				const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password);

				if (isPasswordCorrect){
					return res.status(200).send({ 
						message: "User logged in successfully",
						access: auth.createAccessToken(result)});
				} else {
					return res.status(401).send({ message: "Incorrect email or password"})
				}
			}
		})
		.catch(err => errorHandler(err, req, res));
	} else {
		return res.status(400).send({ message: "Invalid email format"});
	}
}; 

module.exports.getProfile= (req, res) => {
	return User.findById(req.user.id)
	.then(result=> {
		if (!result) {
			return res.status(404).send({ message: "User not found"});
		} else if (!result.isActive) {
			return res.status(403).send({ message: "Account is deactivated. Please contact support."})
		}
		result.password = "";
		res.status(200).send(result);
	})
		.catch(err=> errorHandler(err,req,res));
};

module.exports.updateProfile= (req, res) => {
	return User.findByIdAndUpdate(req.user.id,
		{
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			phone: req.body.phone
		},
		{ new: true }
	)
		.then((result) =>{
			if(!result) {
			return res.status(404).send({message: "User not found"});
		} else {
			return res.status(200).send({ message: "User profile updated successfully"});
		}
	})
		.catch(err => errorHandler(err, req, res));
};

module.exports.updateEmail = (req, res) => {
	if (!req.body.email.includes("@")) {
		return res.status(400).send({ message: "Incorrect email format"});
	}

	return User.findByIdAndUpdate(req.user.id,
		{email: req.body.email},
		{ new: true }
		)

		.then((result) =>{
			if (!result) {
				return res.status(404).send({ message: "User not found"});
			} else {
				return res.status(200).send({ message: "Email updated successfully"});
			}
		})
		.catch((err) => errorHandler(err, req, res));
};

module.exports.updatePassword = (req, res) => {
	if (req.body.newPassword.length < 8) {
		return res.status(400).send({ message: "Password must be at least 8 characters"});
	}

	return User.findById(req.user.id)
	.then((user) => {
		if (!user) {
			return res.status(404).send({ message: "User not found"});
		}

		const isPasswordCorrect = bcrypt.compareSync(req.body.oldPassword, user.password);

		if (!isPasswordCorrect) {
			return res.status(401).send({ message: "Incorrect current password"});
		}

		return User.findByIdAndUpdate(req.user.id,
		{ password: bcrypt.hashSync(req.body.newPassword, 10)},
		{ new: true}
		)

		.then((result) =>{
			return res.status(200).send({ message: "Password updated successfully"});
		})
	})
	.catch((err)=> errorHandler(err, req, res));	
};



// ADMIN LEVEL ACCESS
module.exports.getAllUsers= (req, res) => {
	return User.find()
	.then(result => {
		if (result.length === 0) {
			return res.status(404).send({ message: "No users found"});
		}
		return res.status(200).send({
			message: "Users found",
			result: result
		});
	})
	.catch(err=> errorHandler(err, req, res));	
};

module.exports.getUserById= (req, res) => {
	return User.findById(req.params.id)
	.then(result => {
		if (!result) {
			return res.status(404).send({ message: "No user found"});
		}
		return res.status(200).send({
			message: "User found",
			result: result
		});
	})
	.catch(err=> errorHandler(err, req, res));
};

module.exports.updateUserAsAdmin= (req, res) => {
	return User.findByIdAndUpdate(req.params.id,
		{
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			phone: req.body.phone,
			isAdmin: req.body.isAdmin
		},
		{ new: true }
	)
		.then((result) =>{
			if(!result) {
			return res.status(404).send({message: "User not found"});
		} else {
			return res.status(200).send({ message: "User profile updated successfully"});
		}
	})
		.catch(err => errorHandler(err, req, res));
};

module.exports.deactivateUserAsAdmin= (req, res) => {
	return User.findByIdAndUpdate(req.params.id,
		{ isActive: false },
		{ new: true }
	)
		.then((result) =>{
			if(!result) {
			return res.status(404).send({message: "User not found"});
		} else {
			return res.status(200).send({ message: "User profile deactivated"});
		}
	})
		.catch(err => errorHandler(err, req, res));
};

module.exports.activateUserAsAdmin= (req, res) => {
	return User.findByIdAndUpdate(req.params.id,
		{ isActive: true },
		{ new: true }
	)
		.then((result) =>{
			if(!result) {
			return res.status(404).send({message: "User not found"});
		} else {
			return res.status(200).send({ message: "User profile reactivated"});
		}
	})
		.catch(err => errorHandler(err, req, res));
};