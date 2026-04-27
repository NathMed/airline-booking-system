const User = require("../models/User");
const { errorHandler } = require("../auth");
const bcrypt = require("bcryptjs");
const auth = require("../auth");

// USER LEVEL ACCESS

module.exports.registerUser = (req, res) => {
    const { firstName, lastName, email, password, confirmPassword, phone, gender } = req.body;

    if (!firstName || firstName.trim() === "") {
        return res.status(400).send({ message: "First name is required" });
    }
    if (!lastName || lastName.trim() === "") {
        return res.status(400).send({ message: "Last name is required" });
    }
    if (!gender) {
        return res.status(400).send({ message: "Gender is required" });
    }
    if (!email || !email.includes("@")) {
        return res.status(400).send({ message: "Incorrect email format" });
    }
    if (!password || password.length < 8) {
        return res.status(400).send({ message: "Password must be at least 8 characters" });
    }
    if (!confirmPassword || confirmPassword !== password) {
        return res.status(400).send({ message: "Passwords do not match" });
    }
    if (!phone || phone.length !== 11) {
        return res.status(400).send({ message: "Phone number must be 11 digits" });
    }

    return User.findOne({ email })
        .then((existingUser) => {
            if (existingUser) {
                return res.status(409).send({ message: "Email already registered" });
            }

            const newUser = new User({
                firstName,
                lastName,
                gender,
                email,
                password: bcrypt.hashSync(password, 10),
                phone,
                isAdmin: false
            });

            return newUser.save()
                .then((result) => res.status(201).send({
                    message: "User registered successfully!",
                    result
                }));
        })
        .catch((err) => errorHandler(err, req, res)); 
};

module.exports.loginUser = (req, res) => {
	const { email, password } = req.body;

	if (!email || !email.includes("@")) {
		return res.status(400).send({ message: "Invalid email format"})
	}
	 if (!password) {
        return res.status(400).send({ message: "Password is required" });
    }

	return User.findOne({ email })
		.then(result => {
			if (result === null) {
				return res.status(404).send({ message: "Email not found"});
			} 
			if (!result.isActive) {
				return res.status(403).send({ message: "Account is deactivated. Please contact support."})
			} 
			
			const isPasswordCorrect = bcrypt.compareSync(password, result.password);

			if (isPasswordCorrect){
				return res.status(200).send({ 
					message: "User logged in successfully",
					access: auth.createAccessToken(result)});
				} else {
					return res.status(401).send({ message: "Incorrect email or password"})
				}
		})
		.catch(err => errorHandler(err, req, res));
}; 

module.exports.getProfile = (req, res) => {
	return User.findById(req.user.id)
	.then(result => {
		if (!result) {
			return res.status(404).send({ message: "User not found"});
		} 
		if (!result.isActive) {
			return res.status(403).send({ message: "Account is deactivated. Please contact support."})
		}
		result.password = "";
		return res.status(200).send(result);
	})
		.catch(err => errorHandler(err,req,res));
};

module.exports.updateProfile = (req, res) => {
	const { firstName, lastName, phone, gender } = req.body;

	return User.findByIdAndUpdate(
		req.user.id,
		{ firstName, lastName, phone, gender },
		{ new: true }
	)
		.then((result) =>{
			if(!result) {
			return res.status(404).send({ message: "User not found"});
		} 
			return res.status(200).send({ 
				message: "User profile updated successfully",
				result
			});
	})
		.catch(err => errorHandler(err, req, res));
};

module.exports.updateEmail = (req, res) => {
	const { email } = req.body;

	if (!email || !email.includes("@")) {
		return res.status(400).send({ message: "Incorrect email format"});
	}

	return User.findByIdAndUpdate(
		req.user.id,
		{ email },
		{ new: true }
	)
		.then((result) =>{
			if (!result) {
				return res.status(404).send({ message: "User not found"});
			} 
				return res.status(200).send({ 
					message: "Email updated successfully",
					result
				});
			
		})
		.catch((err) => errorHandler(err, req, res));
};

module.exports.updatePassword = (req, res) => {
	const { oldPassword, newPassword } = req.body;

	if (!newPassword || newPassword.length < 8) {
		return res.status(400).send({ message: "Password must be at least 8 characters"});
	}

	return User.findById(req.user.id)
	.then((user) => {
		if (!user) {
			return res.status(404).send({ message: "User not found"});
		}

		const isPasswordCorrect = bcrypt.compareSync(oldPassword, user.password);

		if (!isPasswordCorrect) {
			return res.status(401).send({ message: "Incorrect current password"});
		}

		return User.findByIdAndUpdate(req.user.id,
		{ password: bcrypt.hashSync(newPassword, 10)},
		{ new: true }
		)
		.then(() => res.status(200).send({ message: "Password updated successfully"}));		
	})
	.catch((err) => errorHandler(err, req, res));	
};


// ADMIN LEVEL ACCESS

module.exports.getAllUsers = (req, res) => {
	return User.find()
	.then(result => {
		if (result.length === 0) {
			return res.status(404).send({ message: "No users found"});
		}
		return res.status(200).send({
			message: "Users found",
			result
		});
	})
	.catch(err => errorHandler(err, req, res));	
};

module.exports.getUserById = (req, res) => {
	return User.findById(req.params.id)
	.then(result => {
		if (!result) {
			return res.status(404).send({ message: "No user found"});
		}
		return res.status(200).send({
			message: "User found",
			result
		});
	})
	.catch(err => errorHandler(err, req, res));
};

module.exports.updateUserAsAdmin = (req, res) => {
	const { firstName, lastName, email, phone, gender, isAdmin } = req.body;

	return User.findByIdAndUpdate(
		req.params.id,
		{ firstName, lastName, email, phone, gender, isAdmin },
		{ new: true }
	)
		.then((result) =>{
			if(!result) {
			return res.status(404).send({message: "User not found"});
		} 
			return res.status(200).send({ 
				message: "User profile updated successfully",
				result
			});
		
	})
		.catch(err => errorHandler(err, req, res));
};

module.exports.deactivateUserAsAdmin = (req, res) => {
	return User.findById(req.params.id)
		.then((user) => {
			if (!user) {
				return res.status(404).send({ message: "User not found" });
			} 
			if (!user.isActive) {
				return res.status(400).send({ message: "User is already deactivated" });
			}

			return User.findByIdAndUpdate(
				req.params.id,
				{ isActive: false },
				{ new: true }
			)
			.then((result) =>
				res.status(200).send({
					message: "User profile deactivated",
					result
				})
			);
		})
		.catch(err => errorHandler(err, req, res));
};

module.exports.activateUserAsAdmin = (req, res) => {
	return User.findById(req.params.id)
		.then((user) => {
			if (!user) {
				return res.status(404).send({ message: "User not found" });
			} 
			if (user.isActive) {
				return res.status(400).send({ message: "User is already active" });
			}

			return User.findByIdAndUpdate(
				req.params.id,
				{ isActive: true },
				{ new: true }
			)
			.then((result) =>
				res.status(200).send({
					message: "User profile reactivated",
					result
				})
			);
		})
		.catch(err => errorHandler(err, req, res));
};