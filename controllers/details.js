var express = require("express");
var router = express.Router();

router.get("/",function(req,resp){
    resp.render("details",{title:"Order Details",orderid:req.query.id});
})

module.exports = router;

