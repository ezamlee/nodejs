var express = require("express");
var app = express();
var session = require('client-sessions');

var usersController=require("./controllers/users");
app.use("/friends",usersController);

app.use(session({
  cookieName: 'session',
  secret: 'abcdefghijk',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

//application setting
app.set("view engine", "ejs");
app.set("views", "./views");

// Routing
app.use(express.static('public'));

app.listen(8090,function(){
    console.log("Server up");
});
