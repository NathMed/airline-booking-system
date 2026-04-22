const Booking = require("../models/Booking");
const { errorHandler } = require("../auth");
const jwt = require("jsonwebtoken");

// USER LEVEL ACCESS
module.exports.createBooking = (req, res) => {
	const token = req.headers.authorization;
	if (token) {
		try {
			const cleanToken = token.slice(7);
      		req.user = jwt.verify(cleanToken, process.env.JWT_SECRET_KEY);
		} catch (err){
			req.user = null;
		}
	}

	if (!token && (!req.body.guestEmail || !req.body.guestEmail.includes("@"))) {
		return res.status(400).send({ message: "Email is required for guest booking"});
	} else if (!req.body.flightId) {
		return res.status(400).send({ message: "Flight ID is required"});
	} else if (!req.body.totalAmount) {
		return res.status(400).send({ message: "Total Amount is required"});
	}

	const bookingReference = "F606-" + Date.now();

	return Booking.findOne({ bookingReference })
		.then((existingBooking) =>{
			if (existingBooking) {
				return res.status(409).send({ message: "Booking Reference already exists"})
			}

			let newBooking = new Booking({
			userId: req.user ? req.user.id: null,
			guestEmail: req.user ? req.user.email: req.body.guestEmail, 
			flightId: req.body.flightId,
			bookingReference: bookingReference,
			status: "pending",
			totalAmount: req.body.totalAmount,
			isActive: true
			});

		return newBooking.save()
		.then((result) => res.status(201).send({ 
			message: "Booking created successfully",
			bookingReference: result.bookingReference
		}))
		.catch((err) => errorHandler(err, req, res));	
		}) 
	.catch((err) => errorHandler(err, req, res));	
};

module.exports.getMyBooking = (req, res) => {
	const token = req.headers.authorization;
	if (token) {
		try {
			const cleanToken = token.slice(7);
      		req.user = jwt.verify(cleanToken, process.env.JWT_SECRET_KEY);
		} catch (err){
			req.user = null;
		}
	}

	// Registered User
	if (req.user) {
		return Booking.find({ userId: req.user.id })
		.then((result)=> {
			if (result.length === 0) {
				return res.status(404).send({ message: "No bookings found"});
		} 
		return res.status(200).send({
			message: "Bookings found",
			bookings: result
		});
	})
		.catch(err=> errorHandler(err,req,res));
	}

	// Guest
	if (!req.body.guestEmail) {
		return res.status(400).send({ message: "Email is required for guest booking viewing"})
	}

	return Booking.find({ guestEmail: req.body.guestEmail })
		.then((result)=> {
			if (result.length === 0) {
				return res.status(404).send({ message: "No bookings found"});
		} 
		return res.status(200).send({
			message: "Bookings found",
			bookings: result
		});
	})
		.catch(err=> errorHandler(err,req,res));
};

module.exports.getBookingByReference = (req, res) => {
	return Booking.findOne({
		bookingReference: req.params.bookingReference,
		isActive: true
	})
	.then(result => {
		if (!result) {
			return res.status(404).send({ message: "No booking found"});
		}
		return res.status(200).send({
			message: "Booking found",
			result: result
		});
	})
	.catch(err=> errorHandler(err, req, res));
};

module.exports.cancelBooking = (req, res) => {
	const token = req.headers.authorization;
		if (token) {
			try {
				const cleanToken = token.slice(7);
	      		req.user = jwt.verify(cleanToken, process.env.JWT_SECRET_KEY);
			} catch (err){
				req.user = null;
			}
		}

	let query = { bookingReference: req.params.bookingReference };

		// Registered User
		if (req.user) {
			query.userId = req.user.id;
		} else {
			if (!req.body.guestEmail) {
			return res.status(400).send({ message: "Guest email is required for booking cancellation"});
		}
		query.guestEmail = req.body.guestEmail;
		query.userId = null;
		}

	return Booking.findOneAndUpdate(
		{
			...query,
			status: { $in: ["pending", "confirmed"]}
		},
		{
			status: "cancelled",
			isActive: false
		},
		{ new: true}
		)
	.then((result) =>{
			if(!result) {
			return res.status(404).send({message: "Booking not found"});
		} else {
			return res.status(200).send({ 
				message: "Booking cancelled successfully",
				result: result
			});
		}
	})
		.catch(err => errorHandler(err, req, res));

};

// ADMIN LEVEL ACCESS

module.exports.getAllBookings = (req, res) => {
	return Booking.find()
	.then(result => {
		if (result.length === 0) {
			return res.status(404).send({ message: "No bookings found"});
		}
		return res.status(200).send({
			message: "Bookings found",
			result: result
		});
	})
	.catch(err=> errorHandler(err, req, res));

};

module.exports.updateBooking = (req, res) => {
	return Booking.findByIdAndUpdate(req.params.id,
		{
			flightId: req.body.flightId,
			bookingReference: req.body.bookingReference,
			status: req.body.status,
			totalAmount: req.body.totalAmount,
		},
		{ new: true }
	)
		.then((result) =>{
			if(!result) {
			return res.status(404).send({message: "Booking not found"});
		} else {
			return res.status(200).send({ 
				message: "Booking information updated successfully",
				result: result
			});
		}
	})
		.catch(err => errorHandler(err, req, res));
};

module.exports.deactivateBooking = (req, res) => {
	return Booking.findByIdAndUpdate(req.params.id,
		{ isActive: false },
		{ new: true }
	)
		.then((result) =>{
			if(!result) {
			return res.status(404).send({message: "Booking not found"});
		} else {
			return res.status(200).send({ 
				message: "Booking deactivated",
				result: result
			});
		}
	})
		.catch(err => errorHandler(err, req, res));
};

module.exports.reactivateBooking = (req, res) => {
	return Booking.findByIdAndUpdate(req.params.id,
		{ isActive: true },
		{ new: true }
	)
		.then((result) =>{
			if(!result) {
			return res.status(404).send({message: "Booking not found"});
		} else {
			return res.status(200).send({ 
				message: "Booking reactivated",
				result: result
			});
		}
	})
		.catch(err => errorHandler(err, req, res));
};