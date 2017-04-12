var express = require("express");
var router = express.Router();
router.get("/",function(req,resp){
    resp.render("login",{title:"Login"});
})

module.exports = router;

