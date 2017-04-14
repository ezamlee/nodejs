var login = require("../models/logins");
var users = require("../models/users");
var orders = require("../models/orders");
var notifications = require("../models/notifications");
var express = require("express");
var router = express.Router();
var async = require("async");

router.get("/", function (req, resp) {
<<<<<<< HEAD

=======
    console.log(req.session.passport.user)
>>>>>>> 9a611d5c8cd0fd73779192a574b2de547d1017d1
    if(req.session.user){
        resp.render("home", { title: "Home",username:"ahmed essam",img:"av1.png"});
    }else{
        req.session.user = "ahmed@gmail.com";
        resp.redirect("/home")
    }
})

var friendsArray ;
var newData;
var allData;

router.get("/activityList",function(req,resp){
    var id = "heba@gmail.com";

    users.find({"_id":id},(err,data) => {
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
    var id = "ahmed@gmail.com";
    orders.find({"owner":id},(err,data) => {
        resp.send(data);
    })

})

module.exports = router;
