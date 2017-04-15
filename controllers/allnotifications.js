var express = require("express");
var router = express.Router();
var logins = require("../models/logins.js");
var users = require("../models/users.js");
var orders = require("../models/orders.js");
var notifications = require("../models/notifications.js");
var async = require("async");

router.use("/",(req,resp,next)=>{
    if(!(req.session.user)){
        resp.redirect("/login");
    }else{
        users.find({"_id":req.session.user},(err,data)=>{
            console.log(data)
            if(data.length < 1){
                resp.send("user doesnt exit");
            }else{
                console.log("user loaded successfully")
                req.session.name = data[0].name;
                req.session.img  = data[0].img;
                next()
            }
        })
    }
})

router.get("/", function (req, resp) {
        resp.render("allNotifications", { title: "All Notifications", username:req.session.name , img:req.session.img});
})

router.get("/list",function(req,resp){
  notifications.find({'_id': {$ne:req.session.user}, "notifications": {$elemMatch: {"is_read": false}}},(err, data)=>{
    resp.send(data)
  })
})


// router.get("/listnotification",function(req,resp){
//   notifications.find({'_id': {$ne:req.session.user}, "notifications": {$elemMatch: {"is_read": false}}},(err, data)=>{
//     resp.send(data)
//   })
// })

module.exports = router;
