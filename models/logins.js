var mongoose=require("mongoose");
var loginSchema = new mongoose.Schema({
  _id: String
, password: String
});
var logins = mongoose.model('logins', loginSchema);
module.exports = logins;