var express = require('express'),
	connect = require('connect'),
	session = require('cookie-session'),
	bodyParser = require('body-parser'),
	serveStatic = require('serve-static'),
	EmailService = require('./services/email-service');


var emailService = new EmailService('./config.json');

emailService.sendMail({
	to : 'Kirill.Parfenkov@gmail.com',
	subject : "Server started",
	text : "server started",
	html : "<h1>Server started!</h1>"
}, function( err, info ) {
	if ( err ){
		console.log( err );	
	} else {
		console.log( 'Email service work!' );
		console.log( info );
	}
});

var app = express();


app.use(session({
	keys : ['secret1', 'secret2']
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(serveStatic('public'));


app.listen(8080, function() {
	console.log('Server running at 8080 port');
});