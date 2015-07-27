var mongoose = require('mongoose');


/// COLLECTION FOR DEFINING TRACKER BASE MODELS USED IN THE SYSTEM

var modelSchema = mongoose.Schema({

    model: String,
    protocol: String,
	description: String,
	script: String,
});


module.exports.Model = mongoose.model('Model', modelSchema);
