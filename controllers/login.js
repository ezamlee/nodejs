var express = require("express");
var router = express.Router();
var User = require("../models/users");
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');

module.exports = function (app, passport) {
app.get("/",function(req,resp){
      resp.render('login.ejs', { message: req.flash('loginMessage'),title:"login" });
})
// forget
app.get('/forget', function(req, res) {
  res.render('forget.ejs',{ title: req.flash('loginMessage')});
});

app.post('/forget', function(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
          req.flash('error', 'No account with that email address exists.');
          return res.redirect('/forget');
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + (3600000*3); // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {



    var transporter = nodemailer.createTransport({
      service: 'gmail',
         auth: {
             user: 'otloply@gmail.com',
             pass: 'doha123456'
            }
            });

      var mailOptions = {
        to: req.body.email,
        from: 'otloply@gmail.com',
        subject: 'Node.js Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      // smtpTransport.sendMail(mailOptions, function(err) {
      //   req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
      //   done(err, 'done');
      // });
      transporter.sendMail(mailOptions, function (err, info) {
	        if (err) {
	            console.log(err);
	            res.redirect('/');
	        }
	        else {
	            console.log('Message %s sent: %s', info.messageId, info.response);
	            res.redirect('/');
	        }
	    });
    }

  ], function(err) {
    if (err) return next(err);
    res.redirect('/forget');
  });
});


app.get('/reset/:token', function(req, res) {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      console.log("error hna");
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('/forget');
    }
    else {
    res.render("resetpass",{ title: req.flash('loginMessage')});
  }
    // res.render("reset", { user: req.user});
  });
});

app.post('/reset/:token', function(req, res) {
  async.waterfall([
    function(done) {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          req.flash('error', 'Password reset token is invalid or has expired.');
          return res.redirect('back');
        }

        user.password = user.generateHash(req.body.password);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        user.save(function(err) {
          req.logIn(user, function(err) {
            done(err, user);
          });
        });
      });
    },
    function(user, done) {
      var transporter = nodemailer.createTransport({
        service: 'gmail',
           auth: {
               user: 'otloply@gmail.com',
               pass: 'doha123456'
  }
        });
        var mailOptions = {
          to: req.body.email,
          from: 'otloply@gmail.com',
          subject: 'Node.js Password Reset',
           text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'

        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log(err);
                res.redirect('/');
            }
            else {
                console.log('Message %s sent: %s', info.messageId, info.response);
                res.redirect('/');
            }
        });
      }
    ], function(err) {
      if (err) return next(err);
      res.redirect('/forget');
    });
});


//end forget
// locally --------------------------------
  // LOGIN ===============================
  // show the login form
  app.get('/login', function(req, res) {
    // res.render('login.ejs', { title: req.flash('loginMessage') });
    res.render('login.ejs', { message: req.flash('loginMessage'),title:"login" });
    // res.render('signup.ejs', { message: req.flash('signupMessage'),title:"signup" });
  });

  app.get('/logout', function(req, res) {
    req.session.destroy()
    req.logout()
    res.redirect('/')
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/home',
    failureRedirect : '/login', // redirect back to the signup page if there is an error
     failureFlash : true // allow flash messages
  }));

  // facebook -------------------------------

    // send to facebook to do the authentication
    app.get('/auth/facebook', passport.authenticate('facebook', {scope:'email'}));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
      passport.authenticate('facebook', {
        successRedirect : '/home',
        failureRedirect : '/'
      }));

  // twitter --------------------------------

    // send to twitter to do the authentication
    app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));

    // handle the callback after twitter has authenticated the user
    app.get('/auth/twitter/callback',
      passport.authenticate('twitter', {
        successRedirect : '/profile',
        failureRedirect : '/'
      }));


  // google ---------------------------------

    // send to google to do the authentication
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
      passport.authenticate('google', {
        successRedirect : '/home',
        failureRedirect : '/'
      }));

 // =============================================================================
 // AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
 // =============================================================================

  // locally --------------------------------
    app.get('/connect/local', function(req, res) {
      res.render('connect-local.ejs', { message: req.flash('loginMessage') });
    });
    app.post('/connect/local', passport.authenticate('local-signup', {
      successRedirect : '/profile', // redirect to the secure profile section
      failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
    }));

  // facebook -------------------------------

    // send to facebook to do the authentication
    app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

    // handle the callback after facebook has authorized the user
    app.get('/connect/facebook/callback',
      passport.authorize('facebook', {
        successRedirect : '/home',
        failureRedirect : '/'
      }));

  // twitter --------------------------------

    // send to twitter to do the authentication
    app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

    // handle the callback after twitter has authorized the user
    app.get('/connect/twitter/callback',
      passport.authorize('twitter', {
        successRedirect : '/profile',
        failureRedirect : '/'
      }));


  // google ---------------------------------

    // send to google to do the authentication
    app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

    // the callback after google has authorized the user
    app.get('/connect/google/callback',
      passport.authorize('google', {
        successRedirect : '/home',
        failureRedirect : '/'
      }));

 // =============================================================================
 // UNLINK
  //ACCOUNTS =============================================================
 // =============================================================================
 // used to unlink accounts. for social accounts, just remove the token
 // for local account, remove email and password
 // user account will stay active in case they want to reconnect in the future

  // local -----------------------------------
  app.get('/unlink/local', function(req, res) {
    var user            = req.user;
    user.local.email    = undefined;
    user.local.password = undefined;
    user.save(function(err) {
      res.redirect('/profile');
    });
  });

  // facebook -------------------------------
  app.get('/unlink/facebook', function(req, res) {
    var user            = req.user;
    user.facebook.token = undefined;
    user.save(function(err) {
      res.redirect('/profile');
    });
  });

  // twitter --------------------------------
  app.get('/unlink/twitter', function(req, res) {
    var user           = req.user;
    user.twitter.token = undefined;
    user.save(function(err) {
      res.redirect('/profile');
    });
  });

  // google ---------------------------------
  app.get('/unlink/google', function(req, res) {
    var user          = req.user;
    user.google.token = undefined;
    user.save(function(err) {
      res.redirect('/profile');
    });
  });



  // route middleware to ensure user is logged in
  function isLoggedIn(req, res, next) {
   if (req.isAuthenticated())
     return next();

   res.redirect('/');
  }
}
//module.exports = router;
