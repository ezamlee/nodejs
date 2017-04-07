var express = require("express");
var router = express.Router();
var mongoose=require("mongoose");

var ordersSchema = new mongoose.Schema({
_id:String
, owner: String
, meal: String
, restaurant_name: String
, users_invited: {}
,users_joined: {}
,status:String
,menu_image:String
,date:{ type: Date, default: Date.now }
,order_detail:{}
});

router.get("/",function(req,resp){
  mongoose.model("orders").find(function(err,data){
    resp.render("home",{title:"Home", 'data': data});
  });
})

module.exports = router;
