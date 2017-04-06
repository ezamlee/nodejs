var express = require("express");
var router = express.Router();
router.get("/",function(req,resp){
    resp.render("sign",{title:"Register Me"})
})

module.exports = router;