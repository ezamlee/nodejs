var multer =require('multer');

var storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, __dirname + '/../public/img/profile'); // Make sure this folder exists
        },
        filename: function(req, file, cb) {
            var ext = file.originalname.split('.').pop();
            cb(null, file.originalname);
        }
    }),
    upload = multer({ storage: storage }).single('img');

module.exports = function (app, passport,session) {

//=============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================


   // SIGNUP =================================
   // show the signup form
   app.get('/signup', function(req, res) {
     console.log(req.flash('loginMessage'));
    res.render('signup.ejs', { message: req.flash('signupMessage'),title:"signup" });

   });


   // process the signup form
   app.post('/signup',upload, passport.authenticate('local-signup', {

     successRedirect : '/home', // redirect to the secure profile section
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
