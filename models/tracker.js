var mongoose = require('mongoose');


var trackerSchema = mongoose.Schema({

	name: String,
    model: String,
	serverPort: Number,
    protocol: String,
	driver: String,
	description: String,
	script: String,
	GID: Number,
	users: [String]
});


module.exports.Tracker = mongoose.model('Tracker', trackerSchema);
