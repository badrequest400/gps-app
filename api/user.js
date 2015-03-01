var User  = require('../models/user.js').User;

module.exports.getUsers = function(req, res) {

	User.find(function(err, docs) {
		if(err) {
			res.status(500).end('Could not get users from the DB');
			return;
		};

		res.status(200).end(JSON.stringify(docs));
	});
};

module.exports.getUser = function(req, res) {

	User.findOne({username: req.params.username}, function(err, doc) {
		if(err) {
			res.status(500).end('Could not get user from the DB');
			return;
		};

		res.status(200).end(JSON.stringify(doc));
	});
};

module.exports.changePassword = function(req, res) {

	User.findOne({_id: req.body}, function(err, user) {
		if(err) {
			res.status(500).end('Could not find user');
			return;
		};

		if(user.validPassword(req.body.old)) {
			user.pwd = User.generateHash;
			user.save(function(err) {
				if(err) {
					res.status(500).end('Could not change password');
					return;
				};

				res.status(200).end('Successfully changed password');
			});

		} else {
			res.status(404).end('Old password does not match');
			return;
		}
	});
};

module.exports.updateDetails = function(req, res) {

	User.update({username: req.params.username}, req.body, function(err) {
		if(err) {
			res.status(500).end('Could not update user details');
			return;
		};

		res.status(200).end('Successfully updated user detail');
	});
};
