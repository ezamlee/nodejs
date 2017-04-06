var express = require("express");
var router = express.Router();
router.get("/",function(req,resp){
   resp.render("friends",{title:"My Friends"});
 
})

module.exports = router;

