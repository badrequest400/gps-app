var mongoose = require('mongoose');

var latestSchema = mongoose.Schema({

	mystery : Number,
	analogue : String,
	output : String,
	input : String,
	date : Number,
	orientation : Number,
	speed : Number,
	lat : Number,
	lng : Number,
	time : Number,
	GID : Number,
});

module.exports.Latest = mongoose.model('Latest', latestSchema);
