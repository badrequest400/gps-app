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
	GID : Number,
});

module.exports.Reports = mongoose.model('Reports', reportSchema);
