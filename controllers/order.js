var login = require("../models/logins");
var users = require("../models/users");
var orders = require("../models/orders");
var notifications = require("../models/notifications");
var express = require("express");
var router = express.Router();
var async = require("async");

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

router.get("/", function (req, resp) {
        resp.render("orders", { title: "My Orders", username:req.session.name , img:req.session.img});
})

router.get("/list",(req,resp)=>{
	var id = "ahmed@gmail.com";
	async.waterfall(
		[
		    function(callback) {
		    	orders.find({"owner":id},{order_detail:0,date:0}, (err,data)=> {
					callback(null, data);

				})
		    },
		    function(arg1, callback) {
		    	orders.find( {users_invited:id},{ id:1,owner:1,meal:1,restaurant_name:1,users_invited:1,users_joined:1,status:1,menu:1 },(err,data)=>{
					callback(null, arg1,data);
				})

		    },
		    function(arg1, arg2,callback) {
		        function arrayUnique(array) {
				    var a = array.concat();
				    for(var i=0; i<a.length; ++i) {
				        for(var j=i+1; j<a.length; ++j) {
				            if(a[i]._id === a[j]._id)
				                a.splice(j--, 1);
				        }
				    }
				    return a;
				}
		        var data = arrayUnique(arg1.concat(arg2));
		        callback(null, data);
		    }
		],
	    function (err, result) {
	    	resp.send({data:result,user:id});
		}
	);

})
router.get("/menu/:id",(req,resp)=>{
	orders.find({"_id":parseInt(req.params.id)},{"menu":1,"_id":0},(err,data)=>{
		resp.send(data[0])
	})
})
router.get("/invited/:id",(req,resp)=>{
	orders.find({"_id":req.params.id},{"users_invited":1,"_id":0},(err,data)=>{
		console.log(data)
		resp.send(data[0]);
	})
})
router.get("/joined/:id",(req,resp)=>{
	orders.find({"_id":req.params.id},{"users_joined":1,"_id":0},(err,data)=>{
		resp.send(data[0]);
	})
})
module.exports = router;
