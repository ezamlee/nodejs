var express = require("express");
var login = require("../models/logins");
var users = require("../models/users");
var orders = require("../models/orders");
var notifications = require("../models/notifications");
var express = require("express");
var qs = require("querystring");
var bodyParser = require('body-parser');

var router = express.Router();
var app = express();

app.use(bodyParser.urlencoded());
var id = "ahmed@gmail.com";

router.use("/",(req,resp,next)=>{
    if(!(req.session.user)){
        resp.redirect("/login");
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
        resp.render("profile", { title: "Profile", username:req.session.name , img:req.session.img});
})


router.post("/",function(req,resp){
  console.log("the post request data = ", req.body);
    // resp.render("profile",{title:"Profile"});
})


module.exports = router;
