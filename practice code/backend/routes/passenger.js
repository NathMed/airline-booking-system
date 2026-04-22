const express = require("express");
const passengerController = require("../controllers/passenger");
const { verify, verifyAdmin } = require("../auth");
const router = express.Router();

// USER LEVEL ACCESS
router.post("/create-passenger", passengerController.createPassenger);

router.get("/my-passengers", verify, passengerController.getMyPassengers);

router.patch("/update-passenger/:id", verify, passengerController.updatePassenger);

// ADMIN LEVEL ACCESS

router.get("/get-all-passengers", verify, verifyAdmin, passengerController.getAllPassengers);

router.get("/get-passenger/:id", verify, verifyAdmin, passengerController.getPassengerById);

router.patch("/activate-passenger/:id", verify, verifyAdmin, passengerController.activatePassenger);

router.patch("/deactivate-passenger/:id", verify, verifyAdmin, passengerController.deactivatePassenger);

module.exports = router;