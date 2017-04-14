var login = require("../models/logins");
var users = require("../models/users");
var orders = require("../models/orders");
var notifications = require("../models/notifications");
var express = require("express");
var router = express.Router();
var async = require("async");
var bodyParser = require('body-parser');
var postParser = bodyParser.urlencoded({extended: true})
router.use("/",(req,resp,next)=>{
    if(!(req.session.user)){
        resp.send("no page to be loaded");
    }else{
        users.find({"_id":req.session.user},(err,data)=>{
            console.log(data)
            if(data.length < 1){
                resp.send("user doesnt exit");
            }else{
                console.log("user loaded successfully")  
                req.session.name = data[0].name;
                req.session.img  = data[0].img;
                next()        
            }
        })
    }
})

router.get("/", (req, resp)=> {
        resp.render("details", { title: "Order Details", orderid:req.query.id ,username:req.session.name , img:req.session.img});
})

router.get("/list/:id",(req,resp)=>{
	orders.find({"_id":parseInt(req.params.id)},{"order_detail":1,"_id":0,"owner":1},(err,data)=>{
		if(req.session.user == data[0].owner){
			var respond = [data[0] ,true]
			resp.send(respond);
		}else{
			var respond = [data[0] ,false]
			resp.send(respond);
		}
	})
})
router.delete("/update/:id",postParser,(req,resp)=>{
	orders.update({"_id":parseInt(req.params.id)},{$set:{"order_detail":req.body.order}},(err,result)=>{
		console.log(parseInt(req.params.id))
		console.log(req.body.order)
		resp.send(result);
	})
})
module.exports = router;
