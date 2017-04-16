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
	try{
	    if(!(req.session.passport.user)){
	        resp.send("no page to be loaded");
	    }else{
	        users.find({"_id":req.session.passport.user},(err,data)=>{
	            if(data.length < 1){
	                resp.send("user doesnt exit");
	            }else{
	                req.session.name = data[0].name;
	                req.session.img  = data[0].img;
	                next()        
	            }
	        })
	    }
	}catch(err){
		resp.send("error");
	}
})
router.get("/", (req, resp)=> {
	try{
        resp.render("details", { title: "Order Details", orderid:req.query.id ,username:req.session.name , img:req.session.img});
	}catch(err){
		resp.send("error")
	}
})
router.get("/list/:id",(req,resp)=>{
	try{
		orders.find({"_id":parseInt(req.params.id)},{"order_detail":1,"_id":0,"owner":1,"status":1},(err,data)=>{
			if(req.session.passport.user == data[0].owner && data[0].status == "ongoing"){
				var respond = [data[0] ,true]
				resp.send(respond);
			}else{
				var respond = [data[0] ,false]
				resp.send(respond);
			}
		})
	}catch(err){
		resp.send("error");
	}
})
router.delete("/update/:id",postParser,(req,resp)=>{
	try{	
		orders.update({"_id":parseInt(req.params.id),"status":"ongoing"},{$set:{"order_detail":req.body.order}},(err,result)=>{
			if(result.nModified == 0 )
				resp.send("Sorry You are not allowed to edit order anymore");
			else{
				resp.send("updated")
			}
		})
	}catch(err){
		resp.send("error");
	}
})
router.get("/menu/:id",(req,resp)=>{
	try{
		orders.find({"_id":req.params.id},{"_id":0,"menu":1},(err,data)=>{
			resp.send(data[0]);
		})
	}catch(err){
		resp.send("error");
	}
})
router.put("/update/:id",postParser,(req,resp)=>{
	try{
		req.body._id  = req.session.passport.user;
		req.body.name = req.session.name;
		console.log(req.body)
		orders.update({"_id":parseInt(req.params.id),"status":"ongoing"},{"$push":{"order_detail":req.body}},(err,rr)=>{
			if(rr.nModified > 0){
				resp.send("updated")
			}else{
				resp.send("You are not allowed to add to this order")
			}
			
		})
	}catch(err){
		resp.send("error");
	}
})
router.post("/finish/:id",postParser,(req,resp)=>{
	try{
		orders.update({"_id":parseInt(req.params.id),"status":"ongoing","owner":req.session.passport.user},{$set:{"status":"finished"}},(err,mod)=>{
			if(mod.nModified < 1)
				resp.send("error");
			else{
				resp.send("finished");
			}
		})
	}catch(err){
		resp.send("error");
	}
})
router.delete("/cancel/:id",(req,resp)=>{
	try{
		orders.remove({"_id":parseInt(req.params.id),"status":"ongoing","owner":req.session.passport.user},(err)=>{
			if(err)
				resp.send("error");
			else{
				resp.send("canceled");
			}
		})
	}catch(err){
		resp.send("error")
	}
})
module.exports = router;
