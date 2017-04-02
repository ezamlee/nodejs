var express = require("express");
var app = express();

//application setting
app.set("view engine", "ejs");
app.set("views", "./views");

// Routing
app.use(express.static('public'));



app.listen(8090);