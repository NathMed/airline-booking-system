const Booking = require("../models/Booking");
const Flight = require("../models/Flight");
const { errorHandler } = require("../auth");
const { createNotification } = require("./notification");

// USER LEVEL ACCESS

module.exports.createBookingUser = (req, res) => {
    const { flightId, totalAmount } = req.body;

    if (!flightId) {
        return res.status(400).send({ message: "Flight ID is required" });
    }
    if (!totalAmount) {
        return res.status(400).send({ message: "Total Amount is required" });
    }

    return Flight.findById(flightId)
        .then(flight => {
            if (!flight) {
                return res.status(404).send({ message: "Flight not found" });
            }
            if (!flight.isActive) {
                return res.status(400).send({ message: "Cannot book an inactive flight" });
            }

            const bookingReference = "F606-" + Date.now();

            return Booking.findOne({ bookingReference })
                .then(existingBooking => {
                    if (existingBooking) {
                        return res.status(409).send({ message: "Booking Reference already exists" });
                    }

                    const newBooking = new Booking({
                        userId: req.user.id,
                        guestEmail: null,
                        flightId,
                        bookingReference,
                        status: "pending",
                        totalAmount,
                        isActive: true
                    });

                    return newBooking.save()
                        .then(result => res.status(201).send({
                            message: "Booking created successfully",
                            bookingReference: result.bookingReference
                        }));
                });
        })
        .catch(err => errorHandler(err, req, res));
};


module.exports.createBookingGuest = (req, res) => {
    const { flightId, totalAmount, guestEmail } = req.body;

    if (!guestEmail || !guestEmail.includes("@")) {
        return res.status(400).send({ message: "Valid guest email is required" });
    }
    if (!flightId) {
        return res.status(400).send({ message: "Flight ID is required" });
    }
    if (!totalAmount) {
        return res.status(400).send({ message: "Total Amount is required" });
    }

    return Flight.findById(flightId)
        .then(flight => {
            if (!flight) {
                return res.status(404).send({ message: "Flight not found" });
            }
            if (!flight.isActive) {
                return res.status(400).send({ message: "Cannot book an inactive flight" });
            }

            const bookingReference = "F606-" + Date.now();

            return Booking.findOne({ bookingReference })
                .then(existingBooking => {
                    if (existingBooking) {
                        return res.status(409).send({ message: "Booking Reference already exists" });
                    }

                    const newBooking = new Booking({
                        userId: null,
                        guestEmail,
                        flightId,
                        bookingReference,
                        status: "pending",
                        totalAmount,
                        isActive: true
                    });

                    return newBooking.save()
                        .then(result => res.status(201).send({
                            message: "Booking created successfully",
                            bookingReference: result.bookingReference
                        }));
                });
        })
        .catch(err => errorHandler(err, req, res));
};


module.exports.getMyBookingsUser = (req, res) => {
    return Booking.find({ userId: req.user.id })
        .then(result => {
            if (result.length === 0) {
                return res.status(404).send({ message: "No bookings found" });
            }
            return res.status(200).send({
                message: "Bookings found",
                bookings: result
            });
        })
        .catch(err => errorHandler(err, req, res));
};


module.exports.getMyBookingsGuest = (req, res) => {
    const { guestEmail } = req.body;

    if (!guestEmail || !guestEmail.includes("@")) {
        return res.status(400).send({ message: "Valid guest email is required" });
    }

    return Booking.find({ guestEmail, userId: null })
        .then(result => {
            if (result.length === 0) {
                return res.status(404).send({ message: "No bookings found" });
            }
            return res.status(200).send({
                message: "Bookings found",
                bookings: result
            });
        })
        .catch(err => errorHandler(err, req, res));
};


module.exports.getBookingByReference = (req, res) => {
    return Booking.findOne({
        bookingReference: req.params.bookingReference,
        isActive: true
    })
    .then(result => {
        if (!result) {
            return res.status(404).send({ message: "No booking found" });
        }
        return res.status(200).send({
            message: "Booking found",
            result
        });
    })
    .catch(err => errorHandler(err, req, res));
};


module.exports.cancelBookingUser = (req, res) => {
    return Booking.findOneAndUpdate(
        {
            bookingReference: req.params.bookingReference,
            userId: req.user.id,
            status: { $in: ["pending", "confirmed"] }
        },
        {
            status: "cancelled",
            isActive: false
        },
        { new: true }
    )
    .then(result => {
        if (!result) {
            return res.status(404).send({ message: "Booking not found" });
        }
        return res.status(200).send({
            message: "Booking cancelled successfully",
            result
        });
    })
    .catch(err => errorHandler(err, req, res));
};


module.exports.cancelBookingGuest = (req, res) => {
    const { guestEmail } = req.body;

    if (!guestEmail || !guestEmail.includes("@")) {
        return res.status(400).send({ message: "Valid guest email is required" });
    }

    return Booking.findOneAndUpdate(
        {
            bookingReference: req.params.bookingReference,
            guestEmail,
            userId: null,
            status: { $in: ["pending", "confirmed"] }
        },
        {
            status: "cancelled",
            isActive: false
        },
        { new: true }
    )
    .then(result => {
        if (!result) {
            return res.status(404).send({ message: "Booking not found" });
        }
        return res.status(200).send({
            message: "Booking cancelled successfully",
            result
        });
    })
    .catch(err => errorHandler(err, req, res));
};


// ADMIN LEVEL ACCESS

module.exports.getAllBookings = (req, res) => {
    return Booking.find()
        .then(result => {
            if (result.length === 0) {
                return res.status(404).send({ message: "No bookings found" });
            }
            return res.status(200).send({
                message: "Bookings found",
                result
            });
        })
        .catch(err => errorHandler(err, req, res));
};

module.exports.updateBooking = (req, res) => {
    const { flightId, totalAmount } = req.body;

    if (!flightId && !totalAmount) {
        return res.status(400).send({ message: "At least one field is required to update" });
    }

    if (flightId) {
        return Flight.findById(flightId)
            .then(flight => {
                if (!flight) {
                    return res.status(404).send({ message: "Flight not found" });
                }
                if (!flight.isActive) {
                    return res.status(400).send({ message: "Cannot assign an inactive flight" });
                }

                return Booking.findByIdAndUpdate(
                    req.params.id,
                    { flightId, totalAmount },
                    { new: true }
                )
                .then(result => {
                    if (!result) {
                        return res.status(404).send({ message: "Booking not found" });
                    }
                    return res.status(200).send({
                        message: "Booking updated successfully",
                        result
                    });
                });
            })
            .catch(err => errorHandler(err, req, res));
    }

    return Booking.findByIdAndUpdate(
        req.params.id,
        { totalAmount },
        { new: true }
    )
    .then(result => {
        if (!result) {
            return res.status(404).send({ message: "Booking not found" });
        }
        return res.status(200).send({
            message: "Booking updated successfully",
            result
        });
    })
    .catch(err => errorHandler(err, req, res));
};

module.exports.updateBookingStatus = (req, res) => {
    const { status } = req.body;

    const validStatus = ["pending", "confirmed", "cancelled"];
    if (!status || !validStatus.includes(status)) {
        return res.status(400).send({ message: "Valid status is required: pending, confirmed, cancelled" });
    }

    return Booking.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
    )
   
    .then(result => {
        if (!result) {
            return res.status(404).send({ message: "Booking not found" });
        }

        if (status === "confirmed") {
            createNotification({
                userId: result.userId,
                guestEmail: result.guestEmail,
                type: "booking_confirmed",
                message: `Your booking ${result.bookingReference} has been confirmed.`,
                referenceId: result._id,
                referenceModel: "Booking"
            });
        }

        return res.status(200).send({
            message: "Booking status updated successfully",
            result
        });
    })
    .catch(err => errorHandler(err, req, res));
};

module.exports.deactivateBooking = (req, res) => {
    return Booking.findById(req.params.id)
        .then(booking => {
            if (!booking) {
                return res.status(404).send({ message: "Booking not found" });
            }
            if (!booking.isActive) {
                return res.status(400).send({ message: "Booking is already deactivated" });
            }

            return Booking.findByIdAndUpdate(
                req.params.id,
                { isActive: false },
                { new: true }
            )
            .then(result => res.status(200).send({
                message: "Booking deactivated successfully",
                result
            }));
        })
        .catch(err => errorHandler(err, req, res));
};

module.exports.reactivateBooking = (req, res) => {
    return Booking.findById(req.params.id)
        .then(booking => {
            if (!booking) {
                return res.status(404).send({ message: "Booking not found" });
            }
            if (booking.isActive) {
                return res.status(400).send({ message: "Booking is already active" });
            }

            return Booking.findByIdAndUpdate(
                req.params.id,
                { isActive: true },
                { new: true }
            )
            .then(result => res.status(200).send({
                message: "Booking reactivated successfully",
                result
            }));
        })
        .catch(err => errorHandler(err, req, res));
};