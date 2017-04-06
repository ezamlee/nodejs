var express=require("express");
var mongoose=require("mongoose");
var fs=require("fs");
var bodyParser=require("body-parser");
var session = require('client-sessions');
// var users = require("../models/users");
var router=express.Router();
var old_title;
var old_search;


//Database Connections
mongoose.connect("mongodb://127.0.0.1:27017/NodeProject");

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

var middleToParseRequestBody=bodyParser.urlencoded({extended:false});
// determine Action

var users;
router.get("/friends",function(req,resp){
  resp.send("friends page");
})
module.exports=router;
