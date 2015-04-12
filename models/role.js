var mongoose = require('mongoose');


var roleSchema = mongoose.Schema({

	name: String,
	privileges: [String]
});


module.exports.Role = mongoose.model('Role', roleSchema);
