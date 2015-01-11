var Reports = require('../models/report.js').Reports;

// Placeholder, Date-time needs to be properly sorted in the logging server, so it can be sorted on
// Later a better solution is needed, as this is not scalable, query time will grow as collection grows
// Maybe have 2 writes? second collection for latest report?
// or sort on _id which is timestamped?
// needs to be benchmarked with lots of data
module.exports.getLatest = function(req, res) {

	Reports.find({}, {limit: 1, sort: {date: -1}}, function(err, doc) {
		if (err)	throw err;

		res.end(doc);
	});
}
