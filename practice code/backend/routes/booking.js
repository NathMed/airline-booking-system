const express = require("express");
const bookingController = require("../controllers/booking");
const { verify, verifyAdmin } = require("../auth");
const router = express.Router();

// USER LEVEL ACCESS

router.post("/create-booking", bookingController.createBooking);

router.post("/my-booking", bookingController.getMyBooking);

router.get("/get-booking/:bookingReference", bookingController.getBookingByReference);

router.patch("/cancel-booking/:bookingReference", bookingController.cancelBooking);


// ADMIN LEVEL ACCESS

router.get("/get-all-bookings", verify, verifyAdmin, bookingController.getAllBookings);
router.patch("/update-booking/:id", verify, verifyAdmin, bookingController.updateBooking);
router.patch("/deactivate-booking/:id", verify, verifyAdmin, bookingController.deactivateBooking);
router.patch("/reactivate-booking/:id", verify, verifyAdmin, bookingController.reactivateBooking);


module.exports = router;