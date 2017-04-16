var login = require("../models/logins");
var users = require("../models/users");
var orders = require("../models/orders");
var notifications = require("../models/notifications");
var express = require("express");
var router = express.Router();
var async = require("async");

router.use("/",(req,resp,next)=>{
    if(!(req.session.passport.user)){
        resp.send("no page to be loaded");
    }else{
        users.find({"_id":req.session.passport.user},(err,data)=>{
            if(data.length < 1){
                resp.send("user doesn't exit");
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
        resp.render("groups", { title: "My Groups", username:req.session.name , img:req.session.img});
})

router.get("/list",function(req,resp){
    var id =  req.session.passport.user;
    users.find({"_id":id},(err,data) => {
        resp.send(data[0].groups);
    })
})

router.delete("/:groupname",(req,resp) => {
    var id =  req.session.passport.user;
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
    var id =  req.session.passport.user;
    users.update({"_id":id},{"$push":{"groups":obj}}, (err,data) => {

        if(!err)resp.send("1");
        else resp.send("0");
    })
})
router.get("/m/:groupname",(req,resp)=>{
    var id =  req.session.passport.user;
    users.find({"_id":id}, {"groups":{"$elemMatch":{"name":req.params.groupname}},"_id":0},(err,data)=>{
      resp.send(data);
    })
})
router.delete("/remove/:g/:m",(req,resp)=>{
  var id =  req.session.passport.user;
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
    var id =  req.session.passport.user;
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
