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
		io: [{
			in1: {name: String, type: String},
			in2: {name: String, type: String},
			in3: {name: String, type: String},
			in4: {name: String, type: String},
			in5: {name: String, type: String},
			out1: {name: String},
			out2: {name: String},
			out3: {name: String},
			out4: {name: String},
			out5: {name: String}
		}],
		AD: {
			name: String,
			min_value: Number,
			max_value: Number,
			unit: String,
			direction: Number, // 0 -> normal, 1 -> inverse
			type: String
		}
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
