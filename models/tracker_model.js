var mongoose = require('mongoose');


var modelSchema = mongoose.Schema({

    model: String,
    protocol: String,
	driver: String,
	description: String,
	script: String,
});


module.exports.Model = mongoose.model('Model', modelSchema);
