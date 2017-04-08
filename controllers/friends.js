var express = require("express");
var router = express.Router();
var logins = require("../models/logins.js");
var users = require("../models/users.js");
var orders = require("../models/orders.js");
var notifications = require("../models/notifications.js");
var async = require("async");

router.get("/",function(req,resp){
   resp.render("friends",{title:"My Friends"});

})

router.get("/list",function(req,resp){
  var id = "ahmed@gmail.com";

  users.find({"_id":id},(err,data) => {
    console.log(data[0].friends);
    resp.send(data[0].friends);
  })
})

router.put("/:friendname",(req,resp)=>{
    var obj = {
        name:req.params.friendname
    }
    var id = "ahmed@gmail.com";
    users.update({"_id":id},{"$push":{"friends":obj}}, (err,data) => {

        if(!err)resp.send("1");
        else resp.send("0");
    })
})

module.exports = router;
