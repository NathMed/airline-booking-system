const express = require("express");
const passengerController = require("../controllers/passenger");
const { verify, verifyAdmin } = require("../auth");
const router = express.Router();

// USER LEVEL ACCESS
router.post("/create-passenger", passengerController.createPassenger);

module.exports = router;