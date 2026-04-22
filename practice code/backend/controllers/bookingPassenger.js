const BookingPassenger = require("../models/BookingPassenger");
const { errorHandler } = require("../auth");

// USER LEVEL ACCESS

module.exports.createBookingPassenger= (req,res) => {
	const { bookingId, passengerId} = req.body;
	if (!bookingId || !passengerId) {
		return res.status(400).send({ message: "Booking ID and Passenger ID are required"});
	}

	const ticketNumber = "TKT-" + Date.now();

	return BookingPassenger.findOne({ ticketNumber})
	.then((existingTicketNumber)=>{
		if (existingTicketNumber) {
    			return res.status(409).send({ message: "Ticket Number already exists"});
    		}

    		let newBookingPassenger = new BookingPassenger({
    			bookingId: bookingId,
    			passengerId: passengerId,
    			ticketNumber: ticketNumber,
    			isActive: true,
    		});

    		return newBookingPassenger.save()
    		.then((result) => res.status(201).send({ 
    			message: "Booking Passenger created successfully",
    			result: result
    		}))
    		.catch(err => errorHandler(err, req, res));
			})
	.catch(err => errorHandler(err, req, res));
};

module.exports.getBookingPassengerByBooking= (req, res) => {
	return BookingPassenger.findById({ bookingId:req.params.bookingId})
	.then(result => {
		if (!result) {
			return res.status(404).send({ message: "No passengers found for this booking"});
		}
		return res.status(200).send({
			message: "Booking Passenger found",
			result: result
		});
	})
	.catch(err=> errorHandler(err, req, res));
};

// ADMIN LEVEL ACCESS 

module.exports.getAllBookingPassengers= (req, res) => {
	return BookingPassenger.find()
	.then(result => {
		if (result.length === 0) {
			return res.status(404).send({ message: "No Booking Passengers found"});
		}
		return res.status(200).send({
			message: "Booking Passengers found",
			result: result
		});
	})
	.catch(err=> errorHandler(err, req, res));

};


module.exports.deactivateBookingPassenger = (req, res) => {
	return BookingPassenger.findByIdAndUpdate(req.params.id,
		{ isActive: false },
		{ new: true }
	)
		.then((result) =>{
			if(!result) {
			return res.status(404).send({message: "Booking Passenger not found"});
		} else {
			return res.status(200).send({ 
				message: "Booking Passenger deactivated",
				result: result
			});
		}
	})
		.catch(err => errorHandler(err, req, res));
};

module.exports.reactivateBookingPassenger = (req, res) => {
	return BookingPassenger.findByIdAndUpdate(req.params.id,
		{ isActive: true },
		{ new: true }
	)
		.then((result) =>{
			if(!result) {
			return res.status(404).send({message: "BookingPassenger not found"});
		} else {
			return res.status(200).send({ 
				message: "Booking Passenger reactivated",
				result: result
			});
		}
	})
		.catch(err => errorHandler(err, req, res));
};