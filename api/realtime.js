var Reports = require('../models/report.js').Reports;
var Latest  = require('../models/latest.js').Latest;


module.exports.timeFilter = function(req, res) {

	Reports.find({timestamp:{$gte: req.body.start, $lte: req.body.end}}, function(err, docs) {
		if(err)	{
			res.status(500).end('Something went wrong, could not fetch records from DB');
			return;
		};

		res.status(200).end(JSON.stringify(docs));
	});
};

module.exports.getLatest = function(req, res) {
	console.log(req.params)

	Latest.findOne({'tracker.name': req.query.name}, function(err, doc) {
		if(err)	throw err;

		res.status(200).end(JSON.stringify(doc));
	});
};
