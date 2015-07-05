var mongoose = require('mongoose');
//var bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({

	username: String,
	fullname: String,
	pwd: String,
	phone_no: String,
	email: String,
	trackers: [String],
	owner: String,
	role: String,
	privileges: [String],
	status: String,
	max_trackers: Number,
	expiryDate: Date,
	notes: String,
	handlingSteps: String,
	owned_users: [String]
});

//userSchema.methods.validPassword = function(password, callback) {
//	bcrypt.compare(password, this.pwd, function(err, match) {
//		if (err) callback(err);
//		callback(match);
//	});
//};
userSchema.methods.validPassword = function(password, callback) {
	if(this.pwd == password) {
 		callback(true);
	} else {
 		callback(false);
	};
};
//userSchema.methods.generateHash = function(password){
//	var salt = bcrypt.genSaltSync()
//	return bcrypt.hashSync(password, salt);
//};
userSchema.methods.generateHash = function(password){
	return password;
};

module.exports.User = mongoose.model('User', userSchema);
