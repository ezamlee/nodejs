var express = require("express");
var router = express.Router();
router.get("/",function(req,resp){
    resp.render("allNotifications",{title:"Notifications"});
})

module.exports = router;

