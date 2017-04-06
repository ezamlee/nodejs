var express = require("express");
var router = express.Router();
router.get("/",function(req,resp){
    resp.render("home",{title:"Home"});
})

module.exports = router;

