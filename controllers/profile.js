var express = require("express");
var login = require("../models/logins");
var users = require("../models/users");
var orders = require("../models/orders");
var notifications = require("../models/notifications");
var express = require("express");
var qs = require("querystring");
var bodyParser = require('body-parser');
var multer = require("multer");
var uploadedFile = multer({dest: __dirname + "/../public/img/profile"})

var router = express.Router();
var app = express();
//
// var id =  req.session.passport.user;

router.use("/",(req,resp,next)=>{
    if(!(req.session.passport.user)){
        resp.redirect("/login");
    }else{
        users.find({"_id":req.session.passport.user},(err,data)=>{
            console.log(data)
            if(data.length < 1){
                resp.send("user doesnt exit");
            }else{
                console.log("user loaded successfully")
                req.session.name = data[0].name;
                req.session.img  = data[0].img;
                req.session.password  = data[0].password;
                next()
            }
        })
    }
})

router.get("/", function (req, resp) {
  resp.render("profile", { title: "Profile", email:req.session.passport.user, username:req.session.name , img:req.session.img, pass: req.session.password});
})


router.post("/", uploadedFile.single("img"), bodyParser.urlencoded({extended: false}),function(req,resp){
  console.log("for test ",req.body);
  if(req.file == "undefined" && req.body.password != '')
  {
    users.update({_id: req.body.email},{password: req.body.password}, function(err,affectedRows) {
      // console.log('affected rows %d', affectedRows);
      resp.render("profile", { title: "Profile", email:req.session.passport.user, username:req.session.name, username:req.body.name , img:req.session.img, pass: req.body.password});
    });
  }
  else if (req.file != "undefined" && req.body.password == '') {
    users.update({_id: req.body.email},{img:req.file.filename}, function(err,affectedRows) {
      // console.log('affected rows %d', affectedRows);
      resp.render("profile", { title: "Profile", email:req.session.passport.user, username:req.session.name, username:req.body.name , img:req.file.filename, pass: req.session.password});
    });
  }else if (req.file != "undefined" && req.body.password != '') {
    users.update({_id: req.body.email},{img:req.file.filename}, function(err,affectedRows) {
      resp.render("profile", { title: "Profile", email:req.session.passport.user, username:req.session.name, username:req.body.name , img:req.file.filename, pass: req.body.password});
    });
  }


})


module.exports = router;
