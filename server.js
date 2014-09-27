var express = require('express'),
	connect = require('connect'),
	session = require('cookie-session'),
	bodyParser = require('body-parser'),
	serveStatic = require('serve-static'),
	EmailService = require('./services/email-service');


var emailService = new EmailService('./config.json');

var app = express();


app.use(session({
	keys : ['secret1', 'secret2']
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(serveStatic('public'));

app.post( '/api/services/email', function(req, res) {
    var message = req.body.message;
    var sander = req.body.sender;
    emailService.sendMail({
        to : 'Kiryl.Parfiankou.Dev@gmail.com',
        subject : "Message from the parf.by",
        text : message,
        html : "<p>From: " + sander+ "</p><p>" + message + "</p>"
    }, function( err ) {
        if ( err ) {
            console.log('err');
            console.log( err );
            res.json( 400, err);
        } else {
            res.json( 200, {});
        }
    });
});

app.listen(8080, function() {
	console.log('Server running at 8080 port');
});