var login = require("../models/logins");
var users = require("../models/users");
var orders = require("../models/orders");
var notifications = require("../models/notifications");
var express = require("express");
var router = express.Router();
var async = require("async");


router.use("/",(req,resp,next)=>{
    if(!(req.session.user)){
        resp.send("no page to be loaded");
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
        resp.render("details", { title: "Order Details", orderid:req.query.id ,username:req.session.name , img:req.session.img});
})

module.exports = router;
