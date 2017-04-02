var express = require("express");
var app = express();

//application setting
app.set("view engine", "ejs");
app.set("views", "./views");

// Routing
app.use(express.static('public'));

app.get("/",function(req,resp){
    app.render("/login");
})
app.listen(8090);