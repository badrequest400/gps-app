var mongoose = require('mongoose');


var trackerSchema = mongoose.Schema({

	name: String,
    model: String,
	serverPort: Number,
    protocol: String
});


module.exports.Tracker = mongoose.model('Tracker', trackerSchema);
