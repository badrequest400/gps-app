var mongoose = require('mongoose');

var reportSchema = mongoose.Schema({

	mystery : Number,
	analogue : String,
	output : String,
	input : String,
	orientation : Number,
	speed : Number,
	lat : Number,
	lng : Number,
	timestamp : Date,
	odometer: Number,
	tracker : {
		name: String,
		model: String,
		GID: Number
	},
	address: String
});

module.exports.Reports = mongoose.model('Reports', reportSchema);
