module.exports = function (app, passport,session) {

//=============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================


   // SIGNUP =================================
   // show the signup form
   app.get('/signup', function(req, res) {
     console.log(req.flash('loginMessage'));
     res.render('signup.ejs',{ title: "error"});

   });


   // process the signup form
   app.post('/signup', passport.authenticate('local-signup', {

     successRedirect : '/profile', // redirect to the secure profile section
     failureRedirect : '/signup', // redirect back to the signup page if there is an error
     failureFlash : true // allow flash messages
   }));



// route middleware to ensure user is logged in
// function isLoggedIn(req, res, next) {
//  if (req.isAuthenticated())
//    return next();
//
//  res.redirect('/');
// }
}
// module.exports = router;
