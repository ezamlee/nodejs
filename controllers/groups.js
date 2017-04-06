var express = require("express");
var router = express.Router();
router.get("/",function(req,resp){
    resp.render("groups",{title:"My Groups"});
})

module.exports = router;

