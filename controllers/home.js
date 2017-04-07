var express = require("express");
var router = express.Router();
var orders = require("../models/orders");
var users = require("../models/users");


router.get("/",function(req,resp){
  var usersEmail = [];
  var allUsers = [];
  //get user's friends
  users.find({}, function(err,data){
    for (var i = 0; i < data.length; i++) {
      usersEmail.push(data[i].email);
    }
    console.log("usersEmail= ", usersEmail);

    //get all orders data that created by those friends
    orders.find({"owner":{$in: usersEmail}},function(err,data){
      var allData = data;

      for (var i = 0; i < data.length; i++) {
        console.log("owner email = ",data[i].owner);

        users.find({"email":data[i].owner},function(err,data){

          for (var i = 0; i <= data.length; i++) {

              allData[i].key = "data";
              console.log('allData[i]', allData[i]);
          }
          // console.log("allData", allData);
        });
      }
      resp.render("home",{title:"Home", 'data': allData});

    });

  });


})

module.exports = router;
