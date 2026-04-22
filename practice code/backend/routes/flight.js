const express = require("express");
const flightController = require("../controllers/flight");
const { verify, verifyAdmin } = require("../auth");
const router = express.Router();

// USER LEVEL ACCESS

router.get("/search", flightController.searchFlights);


// ADMIN LEVEL ACCESS
router.get("/get-all-flights", verify, verifyAdmin, flightController.getAllFlights);

router.get("/:id", flightController.getFlightById);

router.post("/create-flight", verify, verifyAdmin, flightController.createFlight);

router.patch("/update-flight/:id", verify, verifyAdmin, flightController.updateFlight);

router.patch("/deactivate-flight/:id", verify, verifyAdmin, flightController.deactivateFlight);

router.patch("/reactivate-flight/:id", verify, verifyAdmin, flightController.reactivateFlight);



module.exports = router;