const Payment = require("../models/Payment");
const { errorHandler } = require("../auth");
const jwt = require("jsonwebtoken");

// USER LEVEL ACCESS

module.exports.createPayment = (req, res) => {
	const token = req.headers.authorization;
	  if (token) {
	    try {
	      const cleanToken = token.slice(7);
	      req.user = jwt.verify(cleanToken, process.env.JWT_SECRET_KEY);
	    } catch (err) {
	      req.user = null;
	    }
	  }

	if (!req.body.bookingId) {
		return res.status(400).send({ message: "Booking ID is required"});
	} else if (!req.body.paymentMethod) {
		return res.status(400).send({ message: "Please choose your preferred payment method"});
	} else if (!req.body.amount) {
		return res.status(400).send({ message: "Amount input is required"});
	}

	return Payment.findOne({ bookingId: req.body.bookingId })
	.then((existingPayment)=>{
		if (existingPayment) {
			return res.status(409).send({ message: "Payment already exists for this booking"});
		}

		let newPayment = new Payment({
			userId: req.user ? req.user.id : null,
			bookingId: req.body.bookingId,
			paymentMethod: req.body.paymentMethod,
			amount: req.body.amount,
			status: "pending",
			transactionId: "TXN-" + Date.now(),
			paidAt: null
		});

	return newPayment.save()
	.then((result) => res.status(201).send({ 
		message: "Payment created successfully",
		transactionId: result.transactionId,
		status: result.status
	}))
	.catch((err) => errorHandler(err, req, res));	
	})
	.catch((err) => errorHandler(err, req, res));
};

module.exports.getMyPayments = (req, res) => {
	const token = req.headers.authorization;
	  if (token) {
	    try {
	      const cleanToken = token.slice(7);
	      req.user = jwt.verify(cleanToken, process.env.JWT_SECRET_KEY);
	    } catch (err) {
	      req.user = null;
	    }
	  }

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
			result: result
		});
	})
	.catch(err=> errorHandler(err, req, res));
};

module.exports.updatePaymentStatus = (req, res) => {
	return Payment.findByIdAndUpdate(req.params.id,
		{
			status: req.body.status,
			paidAt: req.body.status === "paid" ? Date.now() : null
		},
		{ new: true }
	)
		.then((result) =>{
			if(!result) {
			return res.status(404).send({message: "Payment not found"});
		} else {
			return res.status(200).send({ 
				message: "Status updated successfully",
				result: result
			});
		}
	})
		.catch(err => errorHandler(err, req, res));
};
