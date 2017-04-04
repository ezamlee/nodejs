var express = require("express");
var app = express();
var mongoose=require("mongoose");

//Database Connections
mongoose.connect("mongodb://127.0.0.1:27017/NodeProject");
//Login Schema
var loginSchema = new mongoose.Schema({
  _id: String
, password: String
});
var login = mongoose.model('login', loginSchema);

//Users Schema  // validator $and (name,email,password)
var usersSchema = new mongoose.Schema({
_id:String
,name: String
, email: String
, password: String
, groups: []
,orders: []
,friends:[]
});
var users = mongoose.model('users', usersSchema);
//Groups Schema   // validator name
var groupsSchema = new mongoose.Schema({
  name: String
  ,owner: {}
, members: []
});
var groups = mongoose.model('groups', groupsSchema);

//Orders Schema  // validator owner
var ordersSchema = new mongoose.Schema({
  owner: String
, meal: String
, restaurant_name: String
, users_invited: []
,users_joined: []
,status:String
,image:String
,date:{ type: Date, default: Date.now }
,order_detail:{}
});
var orders = mongoose.model('orders', usersSchema);
//ORDER Details object will be discussed and added


//application setting
app.set("view engine", "ejs");
app.set("views", "./views");

// Routing
app.use(express.static('public'));

app.get("/register",function(req,resp){
    resp.render("register",{title:"Register Me"})
})
app.get("/",function(req,resp){
    resp.render("login",{title:"Login"});
})
app.get("/friends" , function(req,resp){
    resp.render("friends",{title:"My Friends"});
})
app.get("/groups" , function(req,resp){
    resp.render("groups",{title:"My Groups"});
})
app.get("/orders" , function(req,resp){
    resp.render("orders",{title:"Orders"});
})
app.listen(8090,function(){
    console.log("Server up");
});
