var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var configDB = require('./config/database.js');


//create express app
var app = express();
// set listening port from environment variable (webserver) or default
app.set('port', process.env.PORT || 3000);


// REGISTER ALL MIDDLEWARE HERE
app.use(bodyParser.urlencoded({extended: false})); // request bodies URL encoded
app.use(bodyParser.json()); // request bodies in JSON
app.use(express.static(__dirname + '/public'));

// import routes and pass app object so the routes file can utilise it
require('./routes.js')(app);




app.get('/get_position', function(req, res) {

	var koveto = req.body.koveto

});







var mongooseConnect = function() {
	mongoose.connect('mongodb://'+configDB.username+':'+configDB.pwd+'@'+configDB.host+':'+configDB.port+'/'+configDB.database, function(err){
		if (err) throw err;

		console.log('Connected to MongoDB on ' + configDB.host+':'+configDB.port+'/'+configDB.database);
	});
};


app.listen(app.get('port'), function() {
	console.log('Server listening on port ' + app.get('port'));

	mongooseConnect();

	mongoose.connection.on('disconnected', function() {
		mongooseConnect();
	});
});