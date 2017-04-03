var express = require("express");
var app = express();

//application setting
app.set("view engine", "ejs");
app.set("views", "./views");

// Routing
app.use(express.static('public'));

app.get("/",function(req,resp){
    resp.render("login");
})
app.get("/friends" , function(req,resp){
    resp.render("friends",{title:"My Friends"});
})
app.listen(8090,function(){
    console.log("Server up");
});
