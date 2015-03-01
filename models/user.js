var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({

	_id: String,
	name: String,
	pwd: String,
	phone_no: String,
	email: String,
	trackers: [{name: String, id: Number, model: String}]
});

userSchema.methods.validPassword = function(password, callback) {
	bcrypt.compare(password, this.pwd, function(err, match) {
		if (err) callback(err);
		callback(match);
	});
};

userSchema.methods.generateHash = function(password){
	var salt = bcrypt.genSaltSync()
	return bcrypt.hashSync(password, salt);
};

module.exports.User = mongoose.model('User', userSchema);
