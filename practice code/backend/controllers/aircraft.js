const Aircraft = require("../models/Aircraft");
const { errorHandler } = require("../auth");


module.exports.createAircraft = (req, res) => {
    const { airlineId, model, totalSeats } = req.body;

    if (!airlineId || !model || !totalSeats) {
    	return res.status(400).send({ message: "Airline ID, Model and Total Seats are required"});
    } 

    return Aircraft.findOne({ model: model, airlineId: airlineId})
    	.then((existingAircraft) =>{
    		if (existingAircraft) {
    			return res.status(409).send({ message: "Aircraft already registered"});
    		}

    		let newAircraft = new Aircraft({
    			airlineId: airlineId,
    			model: model,
    			totalSeats: totalSeats,
    			isActive: true,
    		});

    		return newAircraft.save()
    		.then((result) => res.status(201).send({ 
    			message: "Aircraft created successfully",
    			result: result
    		}))
    		.catch(err => errorHandler(err, req, res));
    	})
    	.catch(err => errorHandler(err, req, res));
};


module.exports.getAircraftById = (req, res) => {
	return Aircraft.findById(req.params.id)
	.then(result => {
		if (!result) {
			return res.status(404).send({ message: "No Aircraft is found"});
		}
		return res.status(200).send({
			message: "Aircraft found",
			result: result
		});
	})
	.catch(err=> errorHandler(err, req, res));  
};

module.exports.getAllAircraft = (req, res) => {
	return Aircraft.find()
	.then(result => {
		if (result.length === 0) {
			return res.status(404).send({ message: "No Aircraft found"});
		}
		return res.status(200).send({
			message: "Aircraft found",
			result: result
		});
	})
	.catch(err=> errorHandler(err, req, res));
};

module.exports.updateAircraft = (req, res) => {
	return Aircraft.findByIdAndUpdate(req.params.id,
		{
		 airlineId:req.body.airlineId,
		 model: req.body.model,
		 totalSeats: req.body.totalSeats	
		},
		{ new: true }
	)
		.then((result) =>{
			if(!result) {
			return res.status(404).send({ message: "Aircraft not found"});
		} else {
			return res.status(200).send({ 
				message: "Aircraft updated successfully",
				result: result
			});
		}
	})
		.catch(err => errorHandler(err, req, res));
};

module.exports.deactivateAircraft = (req, res) => {
	return Aircraft.findByIdAndUpdate(req.params.id,
		{ isActive: false },
		{ new: true }
	)
		.then((result) =>{
			if(!result) {
			return res.status(404).send({ message: "Aircraft not found"});
		} else {
			return res.status(200).send({ 
				message: "Aircraft is deactivated",
				result: result
			});
		}
	})
		.catch(err => errorHandler(err, req, res));
};

module.exports.reactivateAircraft = (req, res) => {
	return Aircraft.findByIdAndUpdate(req.params.id,
		{ isActive: true },
		{ new: true }
	)
		.then((result) =>{
			if(!result) {
			return res.status(404).send({ message: "Aircraft not found"});
		} else {
			return res.status(200).send({ 
				message: "Aircraft is reactivated",
				result: result
			});
		}
	})
		.catch(err => errorHandler(err, req, res));
};