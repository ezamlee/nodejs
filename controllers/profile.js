var login = require("../models/logins");
var users = require("../models/users");
var orders = require("../models/orders");
var notifications = require("../models/notifications");
var express = require("express");
var bodyParser = require('body-parser');

var router = express.Router();

router.get("/",function(req,resp){
    resp.render("profile",{title:"Profile",username:"heba bahaa", img: "av3.png"});
})
router.post("/",function(req,resp){
  console.log("the post request data = ", req.body);
    // resp.render("profile",{title:"Profile"});
})


module.exports = router;
