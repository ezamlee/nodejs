var express = require("express");
var app = express();
var mongoose=require("mongoose");

//Database Connections
mongoose.connect("mongodb://127.0.0.1:27017/NodeProject");

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!");
});


var login = require("./models/logins");
var users = require("./models/users");
var orders = require("./models/orders");
var notifications = require("./models/notifications");



users.find({},function(err,data){
    console.log(data[0]);
})
orders.find({},function(err,data){
    console.log(data[0]);
})
login.find({},function(err,data){
    console.log(data[0]);
})
notifications.find({},function(err,data){
    console.log(data);
})



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
