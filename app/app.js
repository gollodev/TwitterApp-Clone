/**
 * Modules Dependencies
 */
var express        = require('express'),
	app	     	   = express(),
	bodyParser     = require('body-parser'),
	methodOverride = require('method-override'),
	path  		   = require('path'),	
	cookieParser   = require('cookie-parser'),
	session 	   = require('express-session'),
	RedisStore 	   = require('connect-redis')(session),
	passport 	   = require('passport'),
	logger 	       = require('morgan'),
	errorHandler   = require('errorhandler'),
	flash          = require('connect-flash');


/**
 * Routes
 */
var indexRoute 	   = require('./routes/indexRoute'),
    configPassport = require('./config/passport');

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
app.use(flash());

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



