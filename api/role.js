var Role = require('../models/role.js').Role;


module.exports.getRoles = function(req, res) {

	Role.find(function(err, docs) {
		if(err) {
			res.status(404).end('Could not get roles');
		};

		res.status(200).end(JSON.stringify(docs));
	});
};
