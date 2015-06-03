
var TwitterStrategy  = require('passport-twitter').Strategy,
    configTwitter    = require('./configTwitter'),
    UserModel		 = require('../models/UserModel');

module.exports = function (passport) {

	// serialize user
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

  	// deserialize user  	
	passport.deserializeUser(function(id, done) {
    	UserModel.findById(id, function(err, user) {
        	done(err, user);
        });
	});

    // Twitter Autenticate
    passport.use(new TwitterStrategy({
        consumerKey     : configTwitter.consumerKey,
        consumerSecret  : configTwitter.consumerSecret,
        callbackURL     : configTwitter.callbackURL
    },
    function(token, tokenSecret, profile, done) {

    // make the code asynchronous
    // User.findOne won't fire until we have all our data back from Twitter
        process.nextTick(function() {

            UserModel.findOne({ _id : profile.id }, function(err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err) return done(err);

                // if the user is found then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user, create them
                    var newUser = new UserModel({
                        _id         : profile.id,
                        token       : token,
                        username    : profile.username,
                        displayName : profile.displayName
                    });                   

                    // save our user into the database
                    newUser.save(function(err) {
                        if (err) throw err;
                        return done(null, newUser);
                    });
                }
            });
    	});
    }));    
};

