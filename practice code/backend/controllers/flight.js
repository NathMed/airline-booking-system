const Flight = require("../models/Flight");
const Aircraft = require("../models/Aircraft");
const Airline = require("../models/Airline");
const Airport = require("../models/Airport");
const { errorHandler } = require("../auth");


// USER LEVEL ACCESS
module.exports.searchFlights = (req, res) => {
	if (!req.query.originAirportId) {
		return res.status(400).send({ message: "Origin Airport ID required"});
	}
	if (!req.query.destinationAirportId) {
		return res.status(400).send({ message: "Destination Airport ID required"});
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
			result
		});
	})
	.catch(err=> errorHandler(err, req, res));
};

// ADMIN LEVEL ACCESS

module.exports.createFlight = (req, res) => {
	const { airlineId, aircraftId, originAirportId, destinationAirportId, flightNumber, departureTime, arrivalTime, basePrice } = req.body;

	if (!airlineId) {
		return res.status(400).send({ message: "Airline ID required"});
	}
	if (!aircraftId) {
		return res.status(400).send({ message: "Aircraft ID required"});
	}
	if (!originAirportId) {
		return res.status(400).send({ message: "Origin Airport ID required"});
	}
	if (!destinationAirportId) {
		return res.status(400).send({ message: "Destination Airport ID required"});
	}
	if (!flightNumber) {
		return res.status(400).send({ message: "Flight number required"});
	}
	if (!departureTime) {
		return res.status(400).send({ message: "Departure Time required"});
	}
	if (!arrivalTime) {
		return res.status(400).send({ message: "Arrival Time required"});
	}
	if (!basePrice) {
		return res.status(400).send({ message: "Base Price required"});
	}

	return Airline.findById(airlineId) 
	        .then(airline => {
	            if (!airline) {
	                return res.status(404).send({ message: "Airline not found" });
	            }
	            if (!airline.isActive) {
	                return res.status(400).send({ message: "Cannot assign an inactive airline" });
	            }

	            return Aircraft.findById(aircraftId)
	                .then(aircraft => {
	                    if (!aircraft) {
	                        return res.status(404).send({ message: "Aircraft not found" });
	                    }
	                    if (!aircraft.isActive) {
	                        return res.status(400).send({ message: "Cannot assign an inactive aircraft" });
	                    }

	                    return Airport.findById(originAirportId) 
	                        .then(originAirport => {
	                            if (!originAirport) {
	                                return res.status(404).send({ message: "Origin airport not found" });
	                            }
	                            if (!originAirport.isActive) {
	                                return res.status(400).send({ message: "Origin airport is inactive" });
	                            }

	                            return Airport.findById(destinationAirportId) .then(destinationAirport => {
	                                    if (!destinationAirport) {
	                                        return res.status(404).send({ message: "Destination airport not found" });
	                                    }
	                                    if (!destinationAirport.isActive) {
	                                        return res.status(400).send({ message: "Destination airport is inactive" });
	                                    }

	                                    return Flight.findOne({ flightNumber })
	                                        .then(existingFlight => {
	                                            if (existingFlight) {
	                                                return res.status(409).send({ message: "Flight number already exists" });
	                                            }

	                                            const newFlight = new Flight({ 
	                                                airlineId,       
	                                                aircraftId,
	                                                originAirportId,
	                                                destinationAirportId,
	                                                flightNumber,
	                                                departureTime,
	                                                arrivalTime,
	                                                status: "scheduled",
	                                                basePrice,
	                                                isActive: true
	                                                
	                                            });

	                                            return newFlight.save()
	                                                .then(result => res.status(201).send({
	                                                    message: "Flight created successfully",
	                                                    result 
	                                                }));
	                                        });
	                                });
	                        });
	                });
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
			result
		});
	})
	.catch(err=> errorHandler(err, req, res));

};

module.exports.updateFlight = (req, res) => {
	const { airlineId, aircraftId, originAirportId, destinationAirportId, flightNumber, departureTime, arrivalTime, status, basePrice } = req.body;

	return Flight.findByIdAndUpdate(req.params.id,
		{ airlineId, aircraftId, originAirportId, destinationAirportId, flightNumber, departureTime, arrivalTime, status, basePrice,
		},
		{ new: true }
	)
		.then((result) =>{
			if(!result) {
			return res.status(404).send({message: "Flight not found"});
		} else {
			return res.status(200).send({ 
				message: "Flight updated successfully",
				result
			});
		}
	})
		.catch(err => errorHandler(err, req, res));
};

module.exports.deactivateFlight = (req, res) => {
    return Flight.findById(req.params.id) 
        .then(flight => {
            if (!flight) {
                return res.status(404).send({ message: "Flight not found" });
            }
            if (!flight.isActive) { 
                return res.status(400).send({ message: "Flight is already deactivated" });
            }

            return Flight.findByIdAndUpdate(
                req.params.id,
                { isActive: false },
                { new: true }
            )
                .then(result => res.status(200).send({
                    message: "Flight deactivated successfully", 
                    result 
                }));
        })
        .catch(err => errorHandler(err, req, res));
};

module.exports.reactivateFlight = (req, res) => {
    return Flight.findById(req.params.id) 
        .then(flight => {
            if (!flight) {
                return res.status(404).send({ message: "Flight not found" });
            }
            if (flight.isActive) { 
                return res.status(400).send({ message: "Flight is already active" });
            }

            return Flight.findByIdAndUpdate(
                req.params.id,
                { isActive: true },
                { new: true }
            )
                .then(result => res.status(200).send({
                    message: "Flight reactivated successfully", 
                    result 
                }));
        })
        .catch(err => errorHandler(err, req, res));
};