/**
 * Modules Dependencies
 */
var express        = require('express');
var app	     	   = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var path  		   = require('path');	
var cookieParser   = require('cookie-parser');
var session 	   = require('express-session');
var RedisStore 	   = require('connect-redis')(session);
var passport 	   = require('passport');
var logger 	       = require('morgan');
var errorHandler   = require('errorhandler');


/**
 * Routes
 */
var indexRoute = require('./routes/indexRoute');
var configPassport = require('./config/passport');



/**
 * Middlewares
 */
// config Port
app.set('port', process.env.PORT || 3000);

// the directory where the template files are located.
app.set('views', './views');

// the template engine to use.
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));		
app.use(methodOverride());
app.use(cookieParser());
app.use(session({ 
    store: new RedisStore(),
    secret: 'keyboard cat',
    saveUninitialized: true,
    resave: false 
}));

// use passport middleware
app.use(passport.initialize());
app.use(passport.session());

indexRoute(app, passport);
configPassport(passport);

app.use(express.static(path.join( __dirname, 'public' )));
app.use(logger('dev'));

// error handling
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

// Server
app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


