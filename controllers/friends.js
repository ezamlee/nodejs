var express = require("express");
var router = express.Router();
var logins = require("../models/logins.js");
var users = require("../models/users.js");
var orders = require("../models/orders.js");
var notifications = require("../models/notifications.js");
var async = require("async");

var id = "ahmed@gmail.com";

router.get("/",function(req,resp){
  // users.find({"_id":id},(err,data) => {
  //   resp.render("friends",{title:"My Friends", img: data[0].img, userName: data[0].name});
  // })
  resp.render("friends", { title: "Friends", username:"heba bahaa"});
})

router.get("/list",function(req,resp){

  users.find({"_id":id},(err,data) => {
    resp.send(data[0].friends);
  })
})

router.put("/:friendname",(req,resp)=>{
  var validateEmail = function (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  }
  if(!validateEmail(req.params.friendname))resp.send("Not an Email")
  else{
    var obj = req.params.friendname
    users.find({},{"_id":'true'},(err,data) => {

      var inArray= function(needle,haystack)
      {
          var count=haystack.length;
          for(var i=0;i<count;i++)
          {
              if(haystack[i]._id===needle){return true;}
          }
          return false;
      }

      var res = inArray(obj, data);
      if (res) {
          users.update({"_id":id},{"$push":{"friends":obj}}, (err,data) => {
              if(!err)resp.send("Friend Added");
              else resp.send("Server Error Please try again later");
          })
      }
      else {
        resp.send("User doesnt exist");
      }
    })

}
})

router.delete("/:friendname",(req,resp)=>{
    var obj = req.params.friendname
    users.find({"_id":id},(err,data) => {
      var list = data[0].friends;
      users.update({"_id":id},{"$pull":{"friends":obj}}, (err,data) => {
          if(!err)resp.send("1");
          else resp.send("0");
      })

    })


})

module.exports = router;
