const Flight = require("../models/Flight");
const { errorHandler } = require("../auth");
const jwt = require("jsonwebtoken");

// USER LEVEL ACCESS
module.exports.searchFlights = (req, res) => {
	if (!req.query.originAirportId) {
		return res.status(404).send({ message: "Origin Airport ID required"});
	} else if (!req.query.destinationAirportId) {
		return res.status(404).send({ message: "Destination Airport ID required"});
	}

	return Flight.find({ 
		originAirportId: req.query.originAirportId,
		destinationAirportId: req.query.destinationAirportId,
		isActive: true,
		status: "scheduled"
	})

	.then((result) => {
		if (result.length === 0) {
			return res.status(404).send({ message: "No flights found"});
		}
		return res.status(200).send({
			message: "Flights found",
			flights: result
		});
	})
	.catch(err => errorHandler(err, req, res));
};

module.exports.getFlightById = (req, res) => {
	return Flight.findOne({
		_id: req.params.id,
		isActive: true
	})
	.then(result => {
		if (!result) {
			return res.status(404).send({ message: "No flight found"});
		}
		return res.status(200).send({
			message: "Flight found",
			result: result
		});
	})
	.catch(err=> errorHandler(err, req, res));
};

// ADMIN LEVEL ACCESS

module.exports.createFlight = (req, res) => {
	if (!req.body.airlineId) {
		return res.status(400).send({ message: "Airline ID required"});
	} else if (!req.body.aircraftId) {
		return res.status(400).send({ message: "Aircraft ID required"});
	} else if (!req.body.originAirportId) {
		return res.status(400).send({ message: "Origin Airport ID required"});
	} else if (!req.body.destinationAirportId) {
		return res.status(400).send({ message: "Destination Airport ID required"});
	}else if (!req.body.flightNumber) {
		return res.status(400).send({ message: "Flight number required"});
	}else if (!req.body.departureTime) {
		return res.status(400).send({ message: "Departure Time required"});
	}else if (!req.body.arrivalTime) {
		return res.status(400).send({ message: "Arrival Time required"});
	}else if (!req.body.basePrice) {
		return res.status(400).send({ message: "Base Price required"});
	}

	return Flight.findOne({flightNumber: req.body.flightNumber})
	.then((existingFlight) =>{
		if (existingFlight) {
			return res.status(409).send({ message: "Flight number already exists"});
		}

		let newFlight = new Flight({
			airlineId: req.body.airlineId,
			aircraftId: req.body.aircraftId,
			originAirportId: req.body.originAirportId,
			destinationAirportId: req.body.destinationAirportId,
			flightNumber: req.body.flightNumber,
			departureTime: req.body.departureTime,
			arrivalTime: req.body.arrivalTime,
			status: "scheduled",
			basePrice: req.body.basePrice,
			isActive: true,
			createdAt: Date.now()
		});

		return newFlight.save()
		.then((result) => res.status(201).send({ 
			message: "Flight created successfully",
			result: result
		}))
		.catch(err => errorHandler(err, req, res));
	})
	.catch(err => errorHandler(err, req, res));
};


module.exports.getAllFlights= (req, res) => {
	return Flight.find()
	.then(result => {
		if (result.length === 0) {
			return res.status(404).send({ message: "No flights found"});
		}
		return res.status(200).send({
			message: "Flights found",
			result: result
		});
	})
	.catch(err=> errorHandler(err, req, res));

};

module.exports.updateFlight = (req, res) => {
	return Flight.findByIdAndUpdate(req.params.id,
		{
			airlineId: req.body.airlineId,
			aircraftId: req.body.aircraftId,
			originAirportId: req.body.originAirportId,
			destinationAirportId: req.body.destinationAirportId,
			flightNumber: req.body.flightNumber,
			departureTime: req.body.departureTime,
			arrivalTime: req.body.arrivalTime,
			status: req.body.status,
			basePrice: req.body.basePrice,
		},
		{ new: true }
	)
		.then((result) =>{
			if(!result) {
			return res.status(404).send({message: "Flight not found"});
		} else {
			return res.status(200).send({ 
				message: "Flight information updated successfully",
				result: result
			});
		}
	})
		.catch(err => errorHandler(err, req, res));
};

module.exports.deactivateFlight = (req, res) => {
	return Flight.findByIdAndUpdate(req.params.id,
		{ isActive: false },
		{ new: true }
	)
		.then((result) =>{
			if(!result) {
			return res.status(404).send({message: "Flight not found"});
		} else {
			return res.status(200).send({ 
				message: "Flight deactivated",
				result: result
			});
		}
	})
		.catch(err => errorHandler(err, req, res));
};

module.exports.reactivateFlight = (req, res) => {
	return Flight.findByIdAndUpdate(req.params.id,
		{ isActive: true },
		{ new: true }
	)
		.then((result) =>{
			if(!result) {
			return res.status(404).send({message: "Flight not found"});
		} else {
			return res.status(200).send({ 
				message: "Flight reactivated",
				result: result
			});
		}
	})
		.catch(err => errorHandler(err, req, res));
};