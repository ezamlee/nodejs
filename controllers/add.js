var express = require("express");
var bodyParser=require("body-parser");
var router = express.Router();

var mongoose = require("mongoose");
var schema = mongoose.Schema;
var userSc=new schema({password:String,name:String,email:String,img:String,groups:[{name:String,members:[String]}],order:[Number],friends:[String]});
mongoose.connect("mongodb://127.0.0.1:27017/NodeProject");
//var model= new mongoose.model("users",userSc);
mongoose.model("users",userSc);


//


var respObj={
    title:"Make Order",
    usrData:{}
};


router.get("/",function(req,resp){
    var tmpdata;
    mongoose.model("users").findOne({"email":/*email using data from session..*/},"name img groups friends",function (err,data) {
        if (!err) {
            var gNames=[];
            data.groups.forEach(function (group) {
                gNames.push(group.name);
            });
            var fNames=[];
            data.friends.forEach(function (friend) {
                mongoose.model("users").findOne({"email":friend},"name",function (error_,fName) {
                    if (!error_) {
                        fNames.push(fName);
                    }else {
                        console.log("error while retrieving friend names:" + error_);
                    }
                });
            });
            tmpdata={"name":data.name,"img":data.img,"groups":gNames,"friends":fNames};
            console.log("Data retrieved successfully!");
            usrObj={title:"Make Order", usrData: tmpdata};
            resp.locals=usrObj;
        }else {
            console.log("error while retrieving user data:" + err);
        }

        //resp.render("user/list");
    })

    resp.render("add_order");
})

router.post("/",bodyParser.urlencoded({extended:false}),function(req,resp){

    //validation

    //save order

    //render orders

}

module.exports = router;
