var express = require("express");
var app = express();
var server = app.listen(8090);
var io = require('socket.io').listen(server);
var mongoose=require("mongoose");
var cors = require("cors");
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var session = require('express-session');

//passport
var passport = require('passport');
var flash    = require('connect-flash');

//Database Connections
// mongoose.connect("mongodb://127.0.0.1:27017/NodeProject");
mongoose.connect("mongodb://ahmed:1111@ds139989.mlab.com:39989/nodeproject");
var login = require("./models/logins");
var users = require("./models/users");
var orders = require("./models/orders");
var notifications = require("./models/notifications");


// app passport setting


 // set up our express application

 app.use(cookieParser()); // read cookies (needed for auth)
 app.use(bodyParser()); // get information from html forms


 // required for passport
 //app.use(session({ secret: 'thesessionissecretgdn' })); // session secret
 app.use(passport.initialize());
 app.use(passport.session()); // persistent login sessions
 app.use(flash()); // use connect-flash for flash messages stored in session





require('./controllers/passport')(passport);
// end of passport configuartion

io.on('connection', function (socket) {
	socket.on("detail_update",(data)=>{
		console.log(data)
		io.to(data.detail).emit("detail_update", data);
	})
	socket.on("detail_room",(data)=>{
		console.log(data)
		socket.join(data.detail);
	})

	socket.on("identify", (data)=>{
		socket.join(data.user);
	})
	socket.on("notify",(data)=>{
    console.log(data)
    if(data.users.length > 0)
  		data.users.forEach((user)=>{
        console.log(user)
  			socket.broadcast.emit("upNotify",{toUpdate : true})
        io.to(user).emit("noti",{toUpdate:true})
  		})
	})


});


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


// app.use("/signup" , require("./controllers/register.js"));
require('./controllers/register.js')(app, passport,session);

// app.use("/ws",require("./controllers/ws.js"));
// app.use("/register" , require("./controllers/register.js"));

app.use("/allnotifications",require("./controllers/allnotifications.js"));
app.use("/notifications",require("./controllers/notifications.js"));
app.use("/add",require("./controllers/add.js"));
app.use("/details",require("./controllers/details.js"));
app.use("/friends",require("./controllers/friends.js"));
app.use("/groups",require("./controllers/groups.js"));
app.use("/home",require("./controllers/home.js"));
// app.use("/login",require("./controllers/login.js"));
require('./controllers/login.js')(app, passport);
app.use("/order",require("./controllers/order.js"));
app.use("/profile",require("./controllers/profile.js"));
app.use("/api",require("./controllers/api.js"));




app.get("/index",function(req,resp){
        resp.render("login",{title:"Login"});
})
