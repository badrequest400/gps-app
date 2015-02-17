// all backend routes for the app

module.exports = function(app) {

	//REPORTS
	var reports = require('./api/report.js')
	app.get('/latest', reports.getLatest); // WON'T WORK YET!!!
	app.post('/timefilter', reports.timeFilter);




	// NEEDS TO BE LAST ROUTE --> redirect all non-defined requests to / (fix angular refresh issue)
	app.get('*', function(req, res) {
		res.redirect('/');
	});
};
