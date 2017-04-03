var express = require("express");
var app = express();

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
