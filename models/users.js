var mongoose=require("mongoose");

var usersSchema = new mongoose.Schema({
_id:String
,name: String
, email: String
,img:String
, password: String
, groups: {}
,orders: {}
,friends:{}
});
var users = mongoose.model('users', usersSchema);

module.exports = users;