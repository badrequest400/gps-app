// all backend routes for the app

module.exports = function(app) {

	//REPORTS
	var reports = require('./api/report.js')
	app.get('/latest', reports.getLatest); // WON'T WORK YET!!!
	app.post('/timefilter', reports.timeFilter);
};
