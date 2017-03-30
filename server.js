/**
 * Created by jmichelin on 3/24/17.
 */
// requirements
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var ip = require('ip');

var configDB = require('./config/database.js');
mongoose.connect(configDB.url);


// app setup
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());
app.set('view engine', 'ejs');

// passport setup
require('./config/passport')(passport);
app.use(session({ secret: '$2a$04$vWlbtFNsbHBZIMsQMu6N/eyviK3AC40Ajp3dTeNw5NJpLmGYlYSMC' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// routes
require('./app/routes.js')(app, passport);

// start app
app.listen(port);
console.log(ip.address() + ':' + port);
console.log(ip.toString(new Buffer([127, 0, 0, 1])) + ':' + port);