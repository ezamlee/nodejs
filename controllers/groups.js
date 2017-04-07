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
router.get("/member/:email",function(req,resp){
    var id = "ahmed@gmail.com";
    users.find({"_id":req.params.email},{"_id":1,"name":1,"img":1},(error,data) => {
        resp.send(data);    
    })
})

module.exports = router;