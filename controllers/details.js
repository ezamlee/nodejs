var express = require("express");
var router = express.Router();
router.get("/",function(req,resp){
    resp.render("details",{title:"Order Details"});
})

module.exports = router;

