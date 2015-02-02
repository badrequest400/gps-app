var Reports = require('../models/report.js').Reports;
var Latest  = require('../models/latest.js').Latest;


module.exports.timeFilter = function(req, res) {

	Reports.find({timestamp:{$gte: req.start, $lte: req.end}}, function(err, docs) {
		if(err)	throw err;

		res.status(200).end(docs);
	});
};

module.exports.getLatest = function(req, res) {

	Latest.findOne(function(err, doc) {
		if(err)	throw err;

		res.status(200).end(JSON.stringify(doc));
	});
};
