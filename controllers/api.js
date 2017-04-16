var login = require("../models/logins");
var users = require("../models/users");
var orders = require("../models/orders");
var notifications = require("../models/notifications");
var express = require("express");
var router = express.Router();

//get user details by id
router.get("/user/:id",(req,resp) => {
    users.find({"_id":req.params.id},{"_id":1,"name":1,"img":1},(error,data) => {
        resp.send(data);    
    })
})

module.exports = router;