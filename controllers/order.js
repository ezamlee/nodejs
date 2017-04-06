var express = require("express");
var router = express.Router();
router.get("/",function(req,resp){
    resp.render("orders",{title:"Orders"});
})

module.exports = router;

