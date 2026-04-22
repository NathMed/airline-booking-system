const Airline = require("../models/Airline");
const { errorHandler } = require("../auth");


// ADMIN ACCESS ONLY

module.exports.createAirline = (req, res) => {
    const { name, iataCode, logoURL } = req.body;

    if (!name || !iataCode || !logoURL) {
        return res.status(400).send({ message: "Airline name, IATA Code and Logo URL are required" });
    } 

    return Airline.findOne({ 
        $or: [
            { name: name },
            { iataCode: iataCode }
        ] 
    })
    .then((existingAirline) => {
        if (existingAirline) {
            const conflict = existingAirline.name === name ? "Name" : "IATA code";
            return res.status(409).send({ message: `${conflict} is already registered` });
        }
        
        let newAirline = new Airline({
            name: name,
            iataCode: iataCode,
            logoURL: logoURL,
            isActive: true
        });

        return newAirline.save()
            .then((result) => {
                return res.status(201).send({ 
                    message: "Airline registered successfully",
                    result: result 
                });
            });
    }) 
    .catch(err => errorHandler(err, req, res));
};


module.exports.getAirlineById = (req, res) => {
	return Airline.findById(req.params.id)
	.then(result => {
		if (!result) {
			return res.status(404).send({ message: "No airline is found"});
		}
		return res.status(200).send({
			message: "Airline found",
			result: result
		});
	})
	.catch(err=> errorHandler(err, req, res));  
};

module.exports.getAllAirlines = (req, res) => {
	return Airline.find()
	.then(result => {
		if (result.length === 0) {
			return res.status(404).send({ message: "No airlines found"});
		}
		return res.status(200).send({
			message: "Airlines found",
			result: result
		});
	})
	.catch(err=> errorHandler(err, req, res));
};

module.exports.updateAirline = (req, res) => {
	return Airline.findByIdAndUpdate(req.params.id,
		{logoURL:req.body.logoURL},
		{ new: true }
	)
		.then((result) =>{
			if(!result) {
			return res.status(404).send({ message: "Airline not found"});
		} else {
			return res.status(200).send({ 
				message: "Airline updated successfully",
				result: result
			});
		}
	})
		.catch(err => errorHandler(err, req, res));
};

module.exports.deactivateAirline = (req, res) => {
	return Airline.findByIdAndUpdate(req.params.id,
		{ isActive: false },
		{ new: true }
	)
		.then((result) =>{
			if(!result) {
			return res.status(404).send({ message: "Airline not found"});
		} else {
			return res.status(200).send({ 
				message: "Airline is deactivated",
				result: result
			});
		}
	})
		.catch(err => errorHandler(err, req, res));
};

module.exports.reactivateAirline = (req, res) => {
	return Airline.findByIdAndUpdate(req.params.id,
		{ isActive: true },
		{ new: true }
	)
		.then((result) =>{
			if(!result) {
			return res.status(404).send({ message: "Airline not found"});
		} else {
			return res.status(200).send({ 
				message: "Airline is reactivated",
				result: result
			});
		}
	})
		.catch(err => errorHandler(err, req, res));
};