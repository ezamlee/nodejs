var login = require("../models/logins");
var users = require("../models/users");
var orders = require("../models/orders");
var notifications = require("../models/notifications");
var express = require("express");
var router = express.Router();
var async = require("async");

router.get("/",function(req,resp){
	resp.render("orders",{title:"Orders"});
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
		    	orders.find( {},{ order_detail: { $elemMatch: { "_id": id } },id:1,owner:1,meal:1,restaurant_name:1,users_invited:1,users_joined:1,status:1,menu:1 },(err,data)=>{
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
module.exports = router;

