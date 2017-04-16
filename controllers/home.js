var login = require("../models/logins");
var users = require("../models/users");
var orders = require("../models/orders");
var notifications = require("../models/notifications");
var express = require("express");
var router = express.Router();
var async = require("async");

router.use("/",(req,resp,next)=>{
    try{
        if(!(req.session.passport.user)){
            resp.send("no page to be loaded");
        }else{
            users.find({"_id":req.session.passport.user},(err,data)=>{
                if(data.length < 1){
                    resp.send("user doesn't exit");
                }else{
                    console.log(data);
                    req.session.name = data[0].name;
                    req.session.img  = data[0].img;
                    next()
                }
            })
        }
    }
    catch(err){resp.send("error")}

})

router.get("/", function (req, resp) {
        resp.render("home", { title: "Home",username:req.session.name,img:req.session.img});

})

var friendsArray ;
var newData;
var allData;

router.get("/activityList",function(req,resp){
    var id =  req.session.passport.user;
    users.find({"_id":id},(err,data) => {
        console.log(data)
        friendsArray = data[0].friends;
        orders.find({"owner": {$in: friendsArray}}, (err, data)=>{
          resp.send(data);
        })
    })

})
router.get("/userData",function(req,resp){
    var friendEmail = req.query.q;
    users.find({"_id":friendEmail},(err,data) => {
        resp.send(data);
    })

})
router.get("/latestActivity",function(req,resp){
    var id = req.session.passport.user;
    orders.find({"owner":id},(err,data) => {
        resp.send(data);
    })

})

module.exports = router;
