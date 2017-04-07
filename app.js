var express = require("express");
var app = express();
var mongoose=require("mongoose");
var session = require('client-sessions');
var cors = require("cors");
//Database Connections
mongoose.connect("mongodb://127.0.0.1:27017/NodeProject");
var login = require("./models/logins");
var users = require("./models/users");
var orders = require("./models/orders");
var notifications = require("./models/notifications");

//middleear to set session module
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
app.use(express.static('public'));
app.use("/register" , require("./controllers/register.js"));
app.use("/allnotifications",require("./controllers/allnotifications.js"));
app.use("/add",require("./controllers/add.js"));
app.use("/details",require("./controllers/details.js"));
app.use("/friends",require("./controllers/friends.js"));
app.use("/groups",require("./controllers/groups.js"));
app.use("/home",require("./controllers/home.js"));
app.use("/login",require("./controllers/login.js"));
app.use("/order",require("./controllers/order.js"));
app.use("/profile",require("./controllers/profile.js"));
app.use("/api",require("./controllers/api.js"));

app.get("/",function(req,resp){
        resp.render("login",{title:"Login"});
})


app.listen(8090,function(){
    console.log("Server up");
});
