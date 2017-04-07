var login = require("../models/logins");
var users = require("../models/users");
var orders = require("../models/orders");
var notifications = require("../models/notifications");
var express = require("express");
var router = express.Router();
var async = require("async");
router.get("/", function (req, resp) {
        resp.render("groups", { title: "My Groups",});
})
router.get("/list",function(req,resp){
    var id = "ahmed@gmail.com";
    users.find({"_id":id},(err,data) => {
        console.log(data[0].groups);
        resp.send(data[0].groups);
    })
})
router.delete("/:groupname",(req,resp) => {
    var id = "ahmed@gmail.com";
    console.log(req.params.groupname)
    users.update( {"_id":id},{ $pull: { "groups" : { "name": req.params.groupname } } }, (err,data) =>{
        if(err){
            console.log("err: "+ err);
            resp.send("0");
        }
        else{
            console.log("data:" + data);
            resp.send("1");
        }
    });
})


module.exports = router;