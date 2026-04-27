const Payment = require("../models/Payment");
const Booking = require("../models/Booking");
const { errorHandler } = require("../auth");


// USER LEVEL ACCESS

module.exports.createPayment = (req, res) => {
	const { bookingId, paymentMethod, amount } = req.body;

	if (!bookingId) {
		return res.status(400).send({ message: "Booking ID is required"});
	} 
	if (!paymentMethod) {
		return res.status(400).send({ message: "Please choose your preferred payment method"});
	} 
	if (!amount) {
		return res.status(400).send({ message: "Amount input is required"});
	}

	return Booking.findById(bookingId)
	        .then((booking) => {
	            if (!booking) {
	                return res.status(404).send({ message: "Booking not found" });
	            }

	            return Payment.findOne({ bookingId })
	                .then((existingPayment) => {
	                    if (existingPayment) {
	                        return res.status(409).send({ message: "Payment already exists for this booking" });
	                    }

	                    const newPayment = new Payment({
	                        userId: req.user ? req.user.id : null,
	                        bookingId,
	                        paymentMethod,
	                        amount,
	                        status: "pending",
	                        transactionId: "TXN-" + Date.now(),
	                        paidAt: null
	                    });

	                    return newPayment.save()
	                        .then((result) => res.status(201).send({
	                            message: "Payment created successfully",
	                            transactionId: result.transactionId,
	                            status: result.status
	                        }));
	                });
	        })
	        .catch((err) => errorHandler(err, req, res)); 
	};

module.exports.getMyPayments = (req, res) => {
	// If registered user
	  if (req.user) {
	    return Payment.find({ userId: req.user.id })
	      .then((result) => {
	        if (result.length === 0) {
	          return res.status(404).send({ message: "No payments found" });
	        }
	        return res.status(200).send({
	          message: "Payments found",
	          payments: result
	        });
	      })
	      .catch((err) => errorHandler(err, req, res));
	  }

	  // If guest
	  if (!req.body.bookingId) {
	    return res.status(400).send({ message: "Booking ID is required for guest payment lookup" });
	  }

	  return Payment.find({ bookingId: req.body.bookingId })
	    .then((result) => {
	      if (result.length === 0) {
	        return res.status(404).send({ message: "No payments found" });
	      }
	      return res.status(200).send({
	        message: "Payments found",
	        payments: result
	      });
	    })
	    .catch((err) => errorHandler(err, req, res));
};


// ADMIN LEVEL ACCESS

module.exports.getAllPayments = (req, res) => {
	return Payment.find()
	.then((result)=>{
		if (result.length === 0) {
			return res.status(404).send({ message: "No payments found"})
		}
		return res.status(200).send({ 
			message: "Payments found",
			payments: result
		})
	})
	.catch((err) => errorHandler(err, req, res));
};

module.exports.getPaymentById = (req, res) => {
	return Payment.findById(req.params.id)
	.then(result => {
		if (!result) {
			return res.status(404).send({ message: "No payment found"});
		}
		return res.status(200).send({
			message: "Payment found",
			result
		});
	})
	.catch(err=> errorHandler(err, req, res));
};

module.exports.updatePaymentStatus = (req, res) => {
    const { status } = req.body;

    const validStatuses = ["pending", "paid", "failed", "refunded"];
    if (!status || !validStatuses.includes(status)) {
        return res.status(400).send({ message: `Status must be one of: ${validStatuses.join(", ")}` });
    }

    return Payment.findById(req.params.id)
        .then((payment) => {
            if (!payment) {
                return res.status(404).send({ message: "Payment not found" });
            }
            if (payment.status === status) {
                return res.status(400).send({ message: `Payment is already marked as ${status}` });
            }

            return Payment.findByIdAndUpdate(
                req.params.id,
                {
                    status,
                    paidAt: status === "paid" ? Date.now() : null
                },
                { new: true }
            )
                .then((result) => res.status(200).send({
                    message: "Status updated successfully",
                    result  
                }));
        })
        .catch((err) => errorHandler(err, req, res));
};