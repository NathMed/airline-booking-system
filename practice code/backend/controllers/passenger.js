const Passenger = require("../models/Passenger");
const { errorHandler } = require("../auth");
const jwt = require("jsonwebtoken");

// USER/GUEST ACCESS
module.exports.createPassenger = (req, res) => {
	const token = req.headers.authorization;
	if (token) {
		try {
			const cleanToken = token.slice(7);
      		req.user = jwt.verify(cleanToken, process.env.JWT_SECRET_KEY);
		} catch (err){
			req.user = null;
		}
	}

	if (!req.body.firstName || req.body.firstName.trim() === "") {
		return res.status(400).send({ message: "First name is required" });
	} else if (!req.body.lastName || req.body.lastName.trim() === "") {
		return res.status(400).send({ message: "Last name is required" });
	} else if (!req.body.dateOfBirth) {
		return res.status(400).send({ message: "Date of Birth is required"});
	} else if (!req.user && (!req.body.email || !req.body.email.includes("@"))) {
		return res.status(400).send({ message: "Incorrect email format"});
	} else if (!req.body.nationality || req.body.nationality.trim() === "") {
		return res.status(400).send({ message: "Nationality is required"});
	} else if (!req.body.passportNumber || req.body.passportNumber.trim() === "") {
		return res.status(400).send({ message: "Passport Number is required"});
	} else if (!req.body.passportExpiry) {
		return res.status(400).send({ message: "Passport Expiry is required"});
	} else if (!req.body.phone || req.body.phone.length !== 11){
		return res.status(400).send({ message: "Phone number must be 11 digits"})
	}

	return Passenger.findOne({ passportNumber: req.body.passportNumber})
		.then((existingPassenger) =>{
			if (existingPassenger) {
				return res.status(409).send({ message: "Passport number already registered"})
			}

			let newPassenger = new Passenger({
			userId: req.user ? req.user.id: null,
			firstName: req.body.firstName, 
			lastName: req.body.lastName, 
			dateOfBirth: req.body.dateOfBirth, 
			email: req.user ? req.user.email: req.body.email, 
			nationality: req.body.nationality, 
			passportNumber: req.body.passportNumber, 
			passportExpiry: req.body.passportExpiry, 
			phone: req.body.phone,
			isProfileSaved: req.user ? true : false 
			});

		return newPassenger.save()
		.then((result) => res.status(201).send({ message: "Passenger created successfully"}))
		.catch((err) => errorHandler(err, req, res));	
		}) 
		.catch((err) => errorHandler(err, req, res));	
};