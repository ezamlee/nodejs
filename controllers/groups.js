var login = require("../models/logins");
var users = require("../models/users");
var orders = require("../models/orders");
var notifications = require("../models/notifications");
var express = require("express");
var router = express.Router();
var async = require("async");

router.get("/", function (req, resp) {
        resp.render("groups", { title: "My Groups",});
})

router.get("/list",function(req,resp){
    var id = "ahmed@gmail.com";
    users.find({"_id":id},(err,data) => {
        console.log(data[0].groups);
        resp.send(data[0].groups);
    })
})
router.delete("/:groupname",(req,resp) => {
    var id = "ahmed@gmail.com";
    console.log(req.params.groupname)
    users.update( {"_id":id},{ $pull: { "groups" : { "name": req.params.groupname } } }, (err,data) =>{
        if(err){
            console.log("err: "+ err);
            resp.send("0");
        }
        else{
            console.log("data:" + data);
            resp.send("1");
        }
    });
})

router.put("/:groupname",(req,resp)=>{
    var obj = {
        name:req.params.groupname,
        members:[]
    }
    var id = "ahmed@gmail.com";
    users.update({"_id":id},{"$push":{"groups":obj}}, (err,data) => {
                
        if(!err)resp.send("1");
        else resp.send("0");
    })
})
router.get("/m/:groupname",(req,resp)=>{
    var id = "ahmed@gmail.com";
    users.find({"_id":id}, {"groups":{"$elemMatch":{"name":req.params.groupname}},"_id":0},(err,data)=>{
      resp.send(data);  
    })    
})

router.delete("/remove/:g/:m",(req,resp)=>{
    var id = "ahmed@gmail.com";
    users.find({"_id":id},(err,data) => {
        console.log(data[0]);
        var i = 0,j=0;
        data[0].groups.forEach((obj)=>{
            console.log(obj.name)
          if(obj.name == req.params.g){
              j =i;
          }
            i++;
        })
        if(data[0].groups[j].members.indexOf(req.params.m) != -1){
            data[0].groups[j].members.splice(data[0].groups[j].members.indexOf(req.params.m),1)
            console.log(data[0].groups)
            users.update({"_id":id},{$set:{"groups" : data[0].groups}},()=>{
                resp.send("1");
            })
        }
    })
})



module.exports = router;
