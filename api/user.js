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

	User.findOne({username: req.params.username}, function(err, user) {
		if(err) {
			res.status(500).end('Could not find user');
			return;
		};

		user.validPassword(req.body.old, function(match) {
			if(match) {

				user.pwd = user.generateHash(req.body.new);
				user.save(function(err) {
					if(err) {
						console.log(err);
						res.status(500).end('Could not change password');
						return;
					};

					res.status(200).end('Successfully changed password');
					return;
				});

			} else {
				res.status(404).end('Old password does not match');
				return;
			};
		});
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

{"pwd" : "something","trackers" : [{	"name" : "BGT-123",	"model" : "x5.02",	"id" : 1234567890}],"username" : "test","fullname" : "Balazs Cseh","phone_no" : 7773098482,"email" : "b@b.com"}
