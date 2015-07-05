var User  = require('../models/user.js').User;
var ObjectId = require('mongoose').Types.ObjectId;

module.exports.getUsers = function(req, res) {

	if(req.query.owner) {
		User.find({owner: new ObjectId(req.query.owner)}, {pwd:0}, function(err, docs) {
			if(err) {
				res.status(500).end('Could not get owner filtered list of users from the DB');
				return;
			};

			res.status(200).end(JSON.stringify(docs));
		});

	} else {

		User.find({}, {pwd:0}, function(err, docs) {
			if(err) {
				res.status(500).end('Could not get users from the DB');
				return;
			};

			res.status(200).end(JSON.stringify(docs));
		});
	};
};

module.exports.getUser = function(req, res) {

	if(req.query.id) {

		User.findOne({_id: new ObjectId(req.query.id)}, function(err, doc) {
			if(err) {
				res.status(500).end('Could not get user from the DB');
				return;
			};

			res.status(200).end(JSON.stringify(doc));
		});

	} else if(req.query.username) {

		User.findOne({username: req.query.username}, function(err, doc) {
			if(err) {
				res.status(500).end('Could not get user from the DB');
				return;
			};

			res.status(200).end(JSON.stringify(doc));
		});
	};
};

module.exports.changePassword = function(req, res) {

	User.findOne({_id: new ObjectId(req.params.id)}, function(err, user) {
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

module.exports.changePasswordAdmin = function(req, res) {

	User.findOne({_id: new ObjectId(req.params.id)}, function(err, user) {
		if(err) {
			res.status(500).end('Could not find user');
			return;
		};

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
	});
};

module.exports.updateDetails = function(req, res) {

	req.body.owner = new ObjectId(req.body.owner);

	User.update({_id: new ObjectId(req.params.id)}, req.body, function(err) {
		if(err) {
			res.status(500).end('Could not update user details');
			return;
		};

		res.status(200).end('Successfully updated user detail');
	});
};

module.exports.createUser = function(req, res) {

	var newUser = new User(req.body);

	newUser.save(function(err) {
		if(err) {
			res.status(500).end('Could not create new user');
			return;
		};

		res.status(200).end('Successfully created new user');
	});
};
