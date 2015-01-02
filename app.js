var express = require('express');
var bodyParser = require('body-parser');


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








app.listen(app.get('port'), function() {
	console.log('Server listening on port ' + app.get('port'));

});