var express = require("express");
var router = express.Router();
router.get("/",function(req,resp){
    resp.render("add_order",{title:"Make Order"});
})

module.exports = router;

