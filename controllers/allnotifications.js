var express = require("express");
var router = express.Router();
var logins = require("../models/logins.js");
var users = require("../models/users.js");
var orders = require("../models/orders.js");
var notifications = require("../models/notifications.js");
var qs = require("querystring");
var bodyParser = require('body-parser');
var async = require("async");


router.use("/",(req,resp,next)=>{
    if(!(req.session.passport.user)){
        resp.redirect("/login");
    }else{
        users.find({"_id":req.session.passport.user},(err,data)=>{
            if(data.length < 1){
                resp.send("user doesn't exit");
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
  notifications.find({'_id': req.session.passport.user},(err, data)=>{
    resp.send(data)
  })
})

router.post("/updateOrder", bodyParser.urlencoded({extended: false}),function(req,resp){
  console.log(req.session.name);
  orders.update({'_id': req.body.id}, {$push:{"users_joined": req.session.passport.user}},(err, data)=>{
     resp.send(data)
    // try{
    //       resp.render("details", { title: "Order Details", orderid:req.body.id ,username:req.session.name , img:req.session.img});
  	// }catch(err){
  	// 	resp.send("error")
  	// }
  })
})

module.exports = router;
