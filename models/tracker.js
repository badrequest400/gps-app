var mongoose = require('mongoose');


var trackerSchema = mongoose.Schema({

    model: String,
    protocol: String,
	driver: String,
	description: String,
	script: String,
});


module.exports.Tracker = mongoose.model('Tracker', trackerSchema);
