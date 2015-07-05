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
	app.get('/loginlog', auth.getLoginLog);

	//USERS
	var user = require('./api/user.js');
	app.get('/get_users', user.getUsers);
	app.get('/get_user/:id', user.getUser);
	app.post('/create_user', user.createUser);
	app.post('/change_password/:id', user.changePassword);
	app.post('/change_password_admin/:id', user.changePasswordAdmin);
	app.post('/update_details/:id', user.updateDetails);
	// app.get('/owned_users', user.getOwnedUsers);

	//ROLES
	var role = require('./api/role.js');
	app.get('/get_roles', role.getRoles);

	//GENERAL
	var general = require('./api/general.js');
	app.post('/delete_history', general.deleteHistory);

	//TRACKERS
	var tracker = require('./api/tracker_model.js');
	app.get('/trackers/trackers', tracker.getTrackers);
	app.post('/trackers/delete_tracker', tracker.deleteTracker);
	app.post('/trackers/update_tracker', tracker.updateTracker);


	// NEEDS TO BE LAST ROUTE --> redirect all non-defined requests to / (fix angular refresh issue)
	app.get('*', function(req, res) {
		res.redirect('/');
	});
};
