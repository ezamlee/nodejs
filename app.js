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
var login = mongoose.model('logins', loginSchema);

//Users Schema  // validator $and (name,email,password)
var usersSchema = new mongoose.Schema({
_id:String
,name: String
, email: String
,img:String
, password: String
, groups: []
,orders: []
,friends:[]
});
var users = mongoose.model('users', usersSchema);

//Groups Schema   // validator name
// var groupsSchema = new mongoose.Schema({
//   name: String
//   ,owner: {}
// , members: []
// });
// var groups = mongoose.model('groups', groupsSchema);

//Orders Schema  // validator owner
var ordersSchema = new mongoose.Schema({
_id:number   
, owner: String
, meal: String
, restaurant_name: String
, users_invited: []
,users_joined: []
,status:String
,menu_image:String
,date:{ type: Date, default: Date.now }
,order_detail:{}
});
var orders = mongoose.model('orders', usersSchema);
//Notifications
var notificationsSchema = new mongoose.Schema({
  _id:String
  ,notifications:[]
});
var notifications = mongoose.model('notifications', notificationsSchema);


//application setting
app.set("view engine", "ejs");
app.set("views", "./views");

// Routing
app.use(express.static('public'));

app.get("/register",function(req,resp){
    resp.render("register",{title:"Register Me"})
})

app.get("/add",function(req,resp){
    resp.render("add_order",{title:"Make Order"});
})

app.get("/allnotifications",function(req,resp){
    resp.render("allNotifications",{title:"Notifications"});
})

app.get("/home",function(req,resp){
    resp.render("home",{title:"Home"});
})

app.get("/",function(req,resp){
    resp.render("login",{title:"Login"});
})

app.get("/profile",function(req,resp){
    resp.render("profile",{title:"Profile"});
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
app.get("/details" , function(req,resp){
    resp.render("details",{title:"Order Details"});
})
app.listen(8090,function(){
    console.log("Server up");
});
