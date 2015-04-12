var mongoose = require('mongoose');

var loginLogSchema = mongoose.Schema({

	user: String,
    timestamp: Date,
    ip: String,
    authorised: Boolean
});

module.exports.LoginLog = mongoose.model('LoginLog', loginLogSchema);
