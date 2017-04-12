var users = require("../models/users");
var express = require("express");
var router = express.Router();

router.get("/", function (req, resp) {
        resp.render("groups", { title: "My Groups",});
})
router.get("/list",function(req,resp){
    var id = "ahmed@gmail.com";
    users.find({"_id":id},(err,data) => {
        resp.send(data[0].groups);
    })
})
router.delete("/:groupname",(req,resp) => {
    var id = "ahmed@gmail.com";
    users.update( {"_id":id},{ $pull: { "groups" : { "name": req.params.groupname } } }, (err,data) =>{
        if(err){
            resp.send("0");
        }
        else{
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
        var i = 0,j=0;
        data[0].groups.forEach((obj)=>{
          if(obj.name == req.params.g){
              j =i;
          }
            i++;
        })
        if(data[0].groups[j].members.indexOf(req.params.m) != -1){
            data[0].groups[j].members.splice(data[0].groups[j].members.indexOf(req.params.m),1)
            users.update({"_id":id},{$set:{"groups" : data[0].groups}},()=>{
                resp.send("1");
            })
        }
    })
})
router.put("/add/:g/:email",(req,resp)=>{
    var validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    var id = "ahmed@gmail.com";
    if(!validateEmail(req.params.email)){
        resp.send("Not Proper mail");
    }
    else{
        users.find({"_id":id},(err,data) => {
            var friend_list  = data[0].friends;
            var i =0,j=0;
            data[0].groups.forEach((obj)=>{
              if(obj.name == req.params.g){
                  j =i;
              }
                i++;
            })
            var members_list =  data[0].groups[j].members
            if(members_list.includes(req.params.email)){
                resp.send("user already exits");
            }else if(!(friend_list.includes(req.params.email))){
               
                resp.send("Not a friend to add to a group");
            }else{
                data[0].groups[j].members.push(req.params.email);
                users.update({"_id":id},{$set : {"groups":data[0].groups}},(data)=>{
                    resp.send("Friend added to the group");
                })
            }
        })
    }
})


module.exports = router;
