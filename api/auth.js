var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var User = require('../models/user.js').User;
var configJWT = require('../config/jwt.js');



module.exports.login = function(req, res) {

	if(req.body.username == '' || req.body.password == '') {
		return res.status(401).end('Provide an email and password!');
	};

	User.findOne({username: req.body.username}, function(err, user) {
		if(err) {
			console.log(err);
			return res.status(401).end('Something went wrong! Please try again!');
		};

		if(!user) {
			return res.status(401).end('Wrong username or password');
		};

		user.validPassword(req.body.password, function(match) {
			if (!match) {
				return res.status(401).end('Wrong username or password');
			}

			var token = jwt.sign(user, configJWT.secret, {expiresInMinutes: 60});

			return res.status(200).send({token: token, user: {username: user.username, fullname: user.fullname, access_level: user.access_level}});
		});
	});
};

module.exports.signup = function(req, res) {

	if(req.body.email == '' || req.body.password == '') {
		return res.status(401).send('Provide an email and password!');
	};

	User.findOne({_id: req.body.email}, {_id:1}, function(err, user) {	// check that user is not registered already
		if(err) {
			console.log(err);
			return res.status(401).end('Something went wrong! Please try again!');
		};

		if(user) {
			return res.status(401).end('Email already registered!');
		};

		var newUser = new User();

		newUser._id = req.body.email;
		newUser.name = req.body.name;
		newUser.pwd = newUser.generateHash(req.body.password);
		newUser.access_level = 5;

		newUser.save(function(err){
			if (err) {
				res.status(401).end('Something went wrong! Please try again!');
			}

			var token = jwt.sign(newUser, configJWT.secret, {expiresInMinutes: 60});

			return res.status(200).send({token: token, user: {email: newUser._id, name: newUser.name, access_level: newUser.access_level}});
		});
	});
};
