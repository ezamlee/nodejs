var express = require("express");
var router = express.Router();
var orders = require("../models/orders");
var users = require("../models/users");


router.get("/",function(req,resp){
  var usersEmail = [];
  
  //get user's friends
  users.find({}, function(err,data){
    for (var i = 0; i < data.length; i++) {
      usersEmail.push(data[i].email);
    }
    console.log("usersEmail= ", usersEmail);

    //get all orders data that created by those friends
    orders.find({"owner":{$in: usersEmail}},function(err,data){
      console.log(data);
      resp.render("home",{title:"Home", 'data': data});
    });

  });


})

module.exports = router;
