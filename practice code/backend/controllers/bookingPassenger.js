const BookingPassenger = require("../models/BookingPassenger");
const Booking = require("../models/Booking");
const Passenger = require("../models/Passenger");
const { errorHandler } = require("../auth");

// USER LEVEL ACCESS

module.exports.createBookingPassenger = (req, res) => {
    const { bookingId, passengerId } = req.body;

    if (!bookingId || !passengerId) {
        return res.status(400).send({ message: "Booking ID and Passenger ID are required" });
    }

    return Booking.findById(bookingId) 
        .then(booking => {
            if (!booking) {
                return res.status(404).send({ message: "Booking not found" });
            }
            if (!booking.isActive) { 
                return res.status(400).send({ message: "Cannot add passenger to an inactive booking" });
            }

            return Passenger.findById(passengerId) 
                .then(passenger => {
                    if (!passenger) {
                        return res.status(404).send({ message: "Passenger not found" });
                    }
                    if (!passenger.isActive) { 
                        return res.status(400).send({ message: "Cannot add an inactive passenger to a booking" });
                    }

                    const ticketNumber = "TKT-" + Date.now(); 

                    return BookingPassenger.findOne({ ticketNumber })
                        .then(existingTicketNumber => {
                            if (existingTicketNumber) {
                                return res.status(409).send({ message: "Ticket number already exists" });  
                            }

                            const newBookingPassenger = new BookingPassenger({ 
                                bookingId, 
                                passengerId,
                                ticketNumber,
                                isActive: true
                            });

                            return newBookingPassenger.save() 
                                .then(result => res.status(201).send({ // 
                                    message: "Booking passenger created successfully",
                                    result 
                                }));
                        });
                });
        })
        .catch(err => errorHandler(err, req, res));
};

module.exports.getBookingPassengerByBooking= (req, res) => {
	return BookingPassenger.find({ bookingId:req.params.bookingId})
	.then(result => {
		if (result.length === 0) {
			return res.status(404).send({ message: "No passengers found for this booking"});
		}
		return res.status(200).send({
			message: "Booking Passengers found",
			result
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
			result
		});
	})
	.catch(err=> errorHandler(err, req, res));

};


module.exports.deactivateBookingPassenger = (req, res) => {
    return BookingPassenger.findById(req.params.id) 
        .then(bookingPassenger => {
            if (!bookingPassenger) {
                return res.status(404).send({ message: "Booking passenger not found" });
            }
            if (!bookingPassenger.isActive) { 
                return res.status(400).send({ message: "Booking passenger is already deactivated" });
            }

            return BookingPassenger.findByIdAndUpdate(
                req.params.id,
                { isActive: false },
                { new: true }
            )
                .then(result => res.status(200).send({
                    message: "Booking passenger deactivated successfully", 
                    result 
                }));
        })
        .catch(err => errorHandler(err, req, res));
};

module.exports.reactivateBookingPassenger = (req, res) => {
    return BookingPassenger.findById(req.params.id) 
        .then(bookingPassenger => {
            if (!bookingPassenger) {
                return res.status(404).send({ message: "Booking passenger not found" }); 
            }
            if (bookingPassenger.isActive) { 
                return res.status(400).send({ message: "Booking passenger is already active" });
            }

            return BookingPassenger.findByIdAndUpdate(
                req.params.id,
                { isActive: true },
                { new: true }
            )
                .then(result => res.status(200).send({
                    message: "Booking passenger reactivated successfully", 
                    result 
                }));
        })
        .catch(err => errorHandler(err, req, res));
};