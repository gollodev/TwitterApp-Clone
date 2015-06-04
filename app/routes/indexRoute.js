var indexController = require('../controllers/indexController');

  
module.exports = function(app, passport) {
  
	app.get('/', indexController);
    // route for login form
    // route for processing the login form
    // route for signup form
    // route for processing the signup form

    // route for showing the profile page
    app.get('/dashboard', isLoggedIn, function(req, res) {
        res.render('dashboard', {
            user: req.user
        });

        req.session.save(function(err) {
          if (err) console.log('Session Error! ' + err);
          console.log('Save Session!');
        });
    });

    // route for logging out
    app.get('/logout', function(req, res) {
        req.logout();
        req.session.destroy(function(err) {
          if (err) console.log('Session Destroy Error! ' + err);
          console.log('Destroy Session!');
        });
        res.redirect('/');
    });    

    // =====================================
    // TWITTER ROUTES ======================
    // =====================================
    // route for twitter authentication and login
    app.get('/auth/twitter', passport.authenticate('twitter'));

    // handle the callback after twitter has authenticated the user
    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect : '/dashboard',
            failureRedirect : '/',
            successFlash: 'Welcome!',
            failureFlash: 'Invalid LogIn'
        }));  

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

//module.exports = router;
