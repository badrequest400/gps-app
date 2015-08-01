var mongoose = require('mongoose');

var latestSchema = mongoose.Schema({

	mystery : Number,
	analogue : String,
	output : String,
	input : String,
	orientation : Number,
	speed : Number,
	lat : Number,
	lng : Number,
	timestamp : Date,
	tracker : {
		name: String,
		model: String,
		GID: Number
	}
}, {collection: 'latest'});

module.exports.Latest = mongoose.model('Latest', latestSchema);
