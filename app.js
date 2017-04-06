var express = require("express");
var app = express();
var mongoose=require("mongoose");
var session = require('client-sessions');
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
    console.log(data[0]);
})

app.use(session({
  cookieName: 'session',
  secret: 'abcdefghijk',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));


//application setting
app.set("view engine", "ejs");
app.set("views", "./views");

//middlewear


// Routing
app.use(express.static('public'));

app.get("/register",function(req,resp){
    // if (!(req.session && req.session.user)) {
    //     resp.redirect("/");
    // }else{
        resp.render("register",{title:"Register Me"})
  //  }
})

app.get("/add",function(req,resp){
    // if (!(req.session && req.session.user)) {
    //     resp.redirect("/");
    // }else{
        resp.render("add_order",{title:"Make Order"});
  //  }
})

app.get("/allnotifications",function(req,resp){
    // if (!(req.session && req.session.user)) {
    //     resp.redirect("/");
    // }else{
        resp.render("allNotifications",{title:"Notifications"});
  //  }
})

app.get("/home",function(req,resp){
    // if (!(req.session && req.session.user)) {
    //     resp.redirect("/");
    // }else{
        resp.render("home",{title:"Home"});
  //  }
})

app.get("/",function(req,resp){

        resp.render("login",{title:"Login"});

})

app.get("/profile",function(req,resp){
    // if (!(req.session && req.session.user)) {
    //     resp.redirect("/");
    // }else{
        resp.render("profile",{title:"Profile"});
    //}
})

app.get("/friends" , function(req,resp){
    // if (!(req.session && req.session.user)) {
    //     resp.redirect("/");
    // }else{
        resp.render("friends",{title:"My Friends"});
    //}
})
app.get("/groups" , function(req,resp){
<<<<<<< HEAD
    if (!(req.session && req.session.user)) {
        resp.redirect("/");
    }else{
=======
    // if (!(req.session && req.session.user)) {
    //     resp.redirect("/");
    // }else{
>>>>>>> a43748d73516def8b9e936e5564dd5cefc3faee9
        resp.render("groups",{title:"My Groups"});
    //}
})
app.get("/orders" , function(req,resp){
    // if (!(req.session && req.session.user)) {
    //     resp.redirect("/");
    // }else{
        resp.render("orders",{title:"Orders"});
    //}
})
app.get("/details" , function(req,resp){
    // if (!(req.session && req.session.user)) {
    //     resp.redirect("/");
    // }else{
        resp.render("details",{title:"Order Details"});
  //  }
})
app.get("/signup" , function(req,resp){
    // if (!(req.session && req.session.user)) {
    //     resp.redirect("/");
    // }else{
        resp.render("signup",{title:"for test"});
    //}
})
app.get("/sign" , function(req,resp){
    // if (!(req.session && req.session.user)) {
    //     resp.redirect("/");
    // }else{
        resp.render("sign",{title:"for test"});
    //}
})


app.listen(8090,function(){
    console.log("Server up");
});
