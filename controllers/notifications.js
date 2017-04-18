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
    if(data.length > 0)
      resp.send(data)
    else{
      resp.send([]);
    }
  })
})


router.get("/update",function(req,resp){


  notifications.find({'_id': req.session.passport.user},(err, data)=>{
    if(data.length > 0)
       for(var i = 1; i < (data[0].notifications.length+1); i++) {
          notifications.update({ '_id': req.session.passport.user,'notifications.id':i},
                { $set:  { 'notifications.$.is_read': true}},
                (err, result) => {
                  if (err) {
                  console.log(err);
                  } else {
                    console.log(result);
                  }
               }
              );
       }

  });

})

module.exports = router;
