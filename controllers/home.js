var login = require("../models/logins");
var users = require("../models/users");
var orders = require("../models/orders");
var notifications = require("../models/notifications");
var express = require("express");
var router = express.Router();
var async = require("async");

router.get("/", function (req, resp) {
        resp.render("home", { title: "Home",});
})
var friendsArray ;
var newData;
var allData;
router.get("/activityList",function(req,resp){
    var id = "heba@gmail.com";

    users.find({"_id":id},(err,data) => {
        friendsArray = data[0].friends;

        orders.find({"owner": {$in: friendsArray}}, (err, data)=>{
          console.log(data);
          resp.send(data);

        })
    })

})

router.get("/userData",function(req,resp){

    var friendEmail = req.query.q;
    console.log('friendEmail', friendEmail);

    users.find({"_id":friendEmail},(err,data) => {
        //console.log(data);
        resp.send(data);
    })

})

module.exports = router;
