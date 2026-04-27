const express = require("express");
const passengerController = require("../controllers/passenger");
const { verify, verifyAdmin, verifyOptional } = require("../auth");
const router = express.Router();

// USER LEVEL ACCESS
router.post("/create-passenger",verifyOptional, passengerController.createPassenger);

router.get("/my-passengers", verify, passengerController.getMyPassengers);

router.post("/guest-passenger", passengerController.getPassengerForGuest);

router.patch("/update-passenger/:id", verify, passengerController.updatePassenger);

router.patch("/update-guest", passengerController.updatePassengerAsGuest);

// ADMIN LEVEL ACCESS

router.get("/get-all-passengers", verify, verifyAdmin, passengerController.getAllPassengers);

router.get("/get-passenger/:id", verify, verifyAdmin, passengerController.getPassengerById);

router.put("/admin-update-passenger/:id/", verify, verifyAdmin, passengerController.adminUpdatePassenger);

router.patch("/activate-passenger/:id", verify, verifyAdmin, passengerController.activatePassenger);

router.patch("/deactivate-passenger/:id", verify, verifyAdmin, passengerController.deactivatePassenger);

module.exports = router;