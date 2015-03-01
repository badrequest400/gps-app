// all backend routes for the app

module.exports = function(app) {

	//REPORTS
	var reports = require('./api/report.js');
	app.get('/latest', reports.getLatest); // WON'T WORK YET!!!
	app.post('/timefilter', reports.timeFilter);

	//AUTH
	var auth = require('./api/auth.js');
	app.post('/signup', auth.signup);
	app.post('/login', auth.login);

	//USERS
	var user = require('./api/user.js');
	app.get('/get_users', user.getUsers);
	app.get('/get_user/:username', user.getUser);
	app.post('/change_password/:username', user.changePassword);
	app.post('/update_details/:username', user.updateDetails);

	// NEEDS TO BE LAST ROUTE --> redirect all non-defined requests to / (fix angular refresh issue)
	app.get('*', function(req, res) {
		res.redirect('/');
	});
};
