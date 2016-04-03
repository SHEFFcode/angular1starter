var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var PORT = process.env.PORT || 7000;
var Yelp = require('yelp');
var runners =	require('./routes/runners');
var uuid = require('node-uuid');
var runs = require('./routes/runs');
var passport = require('passport');
GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var Runner = require('./models/runner.js')
var request = require("request");
session = require('express-session');
findOrCreate = require('mongoose-findorcreate');

app.get('/json/:location', function(req, res) {
	(function(){

    	//Set up yelp connection
    	var yelp = new Yelp({
    		consumer_key: 'jqzRyorgPw4t4nQ3StcSww',
    		consumer_secret: 'FlcrIHmnpG-o8QO9ot8esXECHck',
    		token: 'kO8VNBs0taiSBbwIJCIDTyuvMdciy_Sl',
    		token_secret: 'x85zJHByyXnjGxg1M91wnPEm9MU',
    	});

		// See http://www.yelp.com/developers/documentation/v2/search_api
		yelp.search({ term: 'brunch', location: req.params.location, limit: 5, sort: 1 })
		.then(function (data) {
			res.send(data);
            console.log(data);
		})
		.catch(function (err) {
			console.error(err);
		});

	})();

});

//Mongoose Connection
mongoose.connect('mongodb://sheff:123@ds019839.mlab.com:19839/runandbrunch');
var db = mongoose.conneciton;

//specify a static directory for express to use
app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());

//Routes
app.use('/api/runners', runners);
app.use('/api/runs', runs);


/* ======================= Google Authentication ========================================

//Google Authentication

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


passport.use(new GoogleStrategy({
    clientID: '141240246742-scoggs7ot72a8lob81jpspv9v9ap0s3q.apps.googleusercontent.com',
    clientSecret: 'QWJRpmIZ-WJNa4yXUBHvP38Z',
    callbackURL: "/auth/google/callback"
},
function(accessToken, refreshToken, profile, cb) {
    console.log(profile.emails[0].value);
    var runner = {
        "first_name": profile.name.givenName,
        "last_name": profile.name.familyName,
        "email": profile.emails[0].value
    }
    console.log(runner);
    request({
        url: 'http://localhost:7000/api/runners',
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: runner
    });
    (function (err, user) {
        return cb(err, user);
    })();
}
));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: 'http://localhost:7000/#/runners' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:7000/#/');
});

*/

var passport = require('passport'), 
 GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;



//session configs
app.use(session({
  genid: function(req) {
    return uuid() // use UUIDs for session IDs
  },
  secret: 'ch33rz!'
}))
app.use(passport.initialize());
app.use(passport.session());


passport.use(new GoogleStrategy({
    
    clientID: '141240246742-scoggs7ot72a8lob81jpspv9v9ap0s3q.apps.googleusercontent.com',

    clientSecret: 'QWJRpmIZ-WJNa4yXUBHvP38Z',

    callbackURL: 'https://runandbrunch.herokuapp.com/auth/google/callback'
  },

  function(accessToken, refreshToken, profile, done) {
      Runner.findOrCreate({ runner_id: profile.id }, {first_name: profile.displayName, email: profile.emails[0].value}, function (err, user) {
        return done(err, user);
      });
  }

));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});



// Redirect the user to Google for authentication.  When complete, Google
// will redirect the user back to the application at
//     /auth/google/return
app.get('/auth/google', 
  passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/userinfo.email' }));

// Google will redirect the user to this URL after authentication.  Finish
// the process by verifying the assertion.  If valid, the user will be
// logged in.  Otherwise, authentication has failed.
app.get('/auth/google/callback', 
  passport.authenticate('google', 
    { failureRedirect: '/#/login',
      successRedirect: '/#/dashboard'
    }
  )
);

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


app.get('/', function(req, res, next) {
    res.send('Hello world');
});



app.listen(PORT);
console.log('Server started on port ....' + PORT);