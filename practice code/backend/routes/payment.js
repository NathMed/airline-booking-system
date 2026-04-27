const express = require("express");
const paymentController = require("../controllers/payment");
const { verify, verifyAdmin, verifyOptional  } = require("../auth");
const router = express.Router();

// USER LEVEL ACCESS

router.post("/create-payment", verifyOptional, paymentController.createPayment);

router.get("/my-payments", verifyOptional, paymentController.getMyPayments);

// ADMIN LEVEL ACCESS

router.get("/get-all-payments", verify, verifyAdmin, paymentController.getAllPayments);

router.get("/get-payment/:id", verify, verifyAdmin, paymentController.getPaymentById);

router.patch("/update-payment-status/:id", verify, verifyAdmin, paymentController.updatePaymentStatus);

module.exports = router;