var express = require("express");
var router = express.Router();
var logins = require("../models/logins.js");
var users = require("../models/users.js");
var orders = require("../models/orders.js");
var notifications = require("../models/notifications.js");
var async = require("async");

// router.use("/",(req,resp,next)=>{
//     if(!(req.session.passport.user)){
//         resp.redirect("/login");
//     }else{
//         users.find({"_id":req.session.passport.user},(err,data)=>{
//             console.log(data)
//             if(data.length < 1){
//                 resp.send("user doesnt exit");
//             }else{
//                 console.log("user loaded successfully")
//                 req.session.name = data[0].name;
//                 req.session.img  = data[0].img;
//                 next()
//             }
//         })
//     }
// })
//
// router.get("/", function (req, resp) {
//   console.log("request  to get all notifications in dropdown");
//         resp.render("allNotifications", { title: "All Notifications", username:req.session.name , img:req.session.img});
// })

// router.get("/list",function(req,resp){
//   notifications.find({'_id': req.session.passport.user, "notifications": {$elemMatch: {"is_read": false}}},(err, data)=>{
//     resp.send(data)
//   })
// })

router.get("/list",function(req,resp){
  notifications.find({'_id': req.session.passport.user, "notifications": {$elemMatch: {"is_read": false}}},(err, data)=>{
    resp.send(data)
  })
})


router.get("/update",function(req,resp){
  notifications.find({'_id': req.session.passport.user, "notifications": {$elemMatch: {"is_read": false}}},(err, data)=>{

    data[0].notifications.forEach((obj)=>{
      console.log("obj.is_read", obj.is_read);
      console.log(" obj['is_read']", obj["is_read"]);
      var read = obj["is_read"];
      notifications.update( {'_id': req.session.passport.user } , {$set : {read : true} }, function(err, count){
        console.log(count);
      })
    })

  })

  // db.notifications.update( {'_id': req.session.passport.user } , {$set : {"notifications.$.is_read" : true} }, function(err, count){
  //   console.log(count);
  // })


})

module.exports = router;
