var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({

	username: String,
	fullname: String,
	pwd: String,
	phone_no: String,
	email: String,
	trackers: [{

		name: String,
	    model: String,
		serverPort: Number,
	    protocol: String,
		driver: String,
		description: String,
		script: String,
		GID: Number,
	}],
	owner: mongoose.Schema.ObjectId,
	role: String,
	privileges: [String],
	status: String,
	max_trackers: Number,
	expiryDate: Date,
	notes: String,
	handlingSteps: String,
	owned_users: [String]
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
