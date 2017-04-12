var mongoose=require("mongoose");
var bcrypt   = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
_id:String
,name: String
, email: String
,img:String
, password: String
, groups: {}
,orders: {}
,resetPasswordToken: String
,resetPasswordExpires: Date
,friends:{},
facebook         : {
      id           : String,
      token        : String,
      email        : String,
      name         : String
  },
  google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }
});

userSchema.pre('save', function(next) {
  var user = this;
  var SALT_FACTOR = 5;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

var users = mongoose.model('users', userSchema);
module.exports = users
// module.exports = mongoose.model('User', userSchema);
