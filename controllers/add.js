var express = require("express");
var bodyParser=require("body-parser");
var multer=require("multer");
var formidable=require("formidable");
var fs = require("fs");
var path = require("path");
var uploadedfileMiddleware=multer({dest:"../public/img/menu"});
var router = express.Router();

var login = require("../models/logins");
var users = require("../models/users");
var orders = require("../models/orders");
var notifications = require("../models/notifications");
var mongoose = require("mongoose");
var schema = mongoose.Schema;

var async = require("async");
//

function dummyData(req) {
    var id = req.session.passport.user;
    //router.use("/",function (req,res,next) {
        req.session.user=id;
    //    next();
    //});
}

router.use("/",(req,resp,next)=>{

    //initialize dummy data..
    //dummyData(req);
    //

    if(req.session==null || req.session.passport==null || req.session.passport.user==null){
        resp.redirect("/login");
    }else{
        users.find({"_id":req.session.passport.user},(err,data)=>{
            console.log("retrived session user from db "+data)
            if(data.length < 1){
                resp.send("user doesnt exit");
            }else{
                console.log("user loaded successfully")
                req.session.name = data[0].name;
                req.session.img  = data[0].img;
                next();
            }
        })
    }
})

//opening the page...

router.get("/",function(req,resp){
    var tmpdata;
    users.findOne({"email": req.session.passport.user
                                        /*email using data from session..*/
                                    },"name img groups friends",function (err,data) {
        if (!err) {
            var gNames=[];

            var fNames=[];

            async.waterfall([function (next) {
                data.friends.forEach(function (friend) {
                    users.findOne({"email":friend},"name",function (error_,fName) {
                        if (!error_) {
                            fNames.push(fName.name);
                            console.log("user friend name from db "+fName.name);
                        }else {
                            console.log("error while retrieving friend names:" + error_);
                        }
                    });
                });

                setTimeout(function () {
                next()
            },100);
            },function (next) {
                console.log("second step in waterfall");
                data.groups.forEach(function (group) {
                    gNames.push(group.name);
                    console.log("user groups from db "+group.name);

                });
                next();
            },function (next) {
                console.log("waterfall callback..");
                console.log("friend names " + fNames);
                tmpdata={"name":data.name,"img":data.img,"groups":gNames,"friends":fNames};
                console.log("Data retrieved successfully!");
                usrObj={title:"Make Order", username:req.session.name , img:req.session.img, usrData: tmpdata};
                // user data(name, image, groups, friends) are stored into response.locals in order to be sent to add_order page
                resp.locals=usrObj;

                next();
            }],function () {

                resp.render("add_order");
            });




        }else {
            console.log("error while retrieving user data:" + err);
        }

    })




})


router.use(function (req,res,next) {
    console.log("req method "+req.method);
    if (req.method.startsWith("POST")) {

        console.log("req body "+req.body);
    }
    next();
});

// to submit a new order...
router.post("/",bodyParser.urlencoded({extended:false}),function(req,resp){
    console.log("POST on / ...");
    var ok = true;

    //validation

    var form = new formidable.IncomingForm();



    // store menus in the /public/img/menu/ directory
    form.uploadDir =  './public/img/menu/';
    form.on('file', function(field, file) {

    console.log("file recieved!");

    });

  // log any errors that occur >_<
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    if (ok) {

            console.log("form end success");
            //end
    }
  });

  form.parse(req, function(err, fields, file) {
        // ...
        req.file=file;
        console.log("file neme"+file.menu.name);
        console.log("file "+file);
        console.log(file);

        console.log("req file neme"+req.file.menu.name);



        if ((
            (
                fields.order_type=="Breakfast"
            )
            ||
            (
                fields.order_type=="Lunch"
            )
            ||
            (
                fields.order_type=="Dinner"
            )
        )) {
            console.log("==================================\n\nmeal type OK..");
            console.log(fields.order_type);
        }else {
            console.log("==================================\n\nmeal type FAIL..");
            console.log(fields.order_type);
            //resp.writeHead(400);
            resp.statusCode=400;
            ok=false;
            resp.locals={"error":"meal type error"};
            resp.write("meal type error");
            resp.end("error");

        }


        if ((
            fields.restaurant_name != null
        )
        &&
        (
            fields.restaurant_name != ""
        )) {
            console.log("==================================\n\nrestaurant name OK..");
            console.log(fields.restaurant_name);
        }else {
            console.log("==================================\n\nrestaurant name FAIL..");
            console.log(fields.restaurant_name);
            //resp.writeHead(400);
            resp.statusCode=400;
            ok=false;
            resp.locals={"error":"restaurant name error"};
            resp.write("restaurant name error");
            resp.end("error");

        }

        if ((
            JSON.parse(fields.invited_friends) != null
        )
        &&
        (
            JSON.parse(fields.invited_friends).length > 0
        )) {
            console.log("==================================\n\ninvited_friends name OK..");
            console.log(fields.invited_friends);
        } else {
            console.log("==================================\n\ninvited_friends name FAIL..");
            console.log(fields.invited_friends);
            //resp.writeHead(400);
            resp.statusCode=400;
            ok=false;
            resp.locals={"error":"invited friends error"};
            resp.write("invited friends error");
            resp.end("error");

        }

        if ((
            /*file==null
            ||*/
            (
                file.menu.size<30000000
                &&
                file.menu.type.startsWith("image")
            )
        )) {
            console.log("==================================\n\nmenu OK..");
        } else {
            console.log("==================================\n\nmenu FAIL..");
            //resp.writeHead(400);
            resp.statusCode=400;
            ok=false;

            resp.locals={"error":"menu image error"}
            resp.write("menu image error");
            resp.status(400).end();

        }


        ////////////////////////////////////////////////////////////////////////
        if (ok) {


        var new_order=new orders();

        orders.find({

            },
            ['_id'],
            {
                sort:{
                    _id:-1
                }
            },function (err,y) {

                console.log("orders y from db "+y);
                if (y.length<1) {
                        new_order._id=1;
                }else {
                    new_order._id=y[0]._id+1;
                }

                    console.log("new_order._id  "+new_order._id);
                    new_order.owner=req.session.passport.user;
                    new_order.meal=fields.order_type;
                    new_order.restaurant_name=fields.restaurant_name;

                    var farr=[];
                    for (var name in JSON.parse(fields.invited_friends)) {

                        mongoose.model("users").find({name:JSON.parse(fields.invited_friends)[name]},["_id"],{},function (err,mailarr) {
                            farr.push(mailarr[0]._id) ;



                        });

                    }



                    new_order.users_joined=[];
                    new_order.status="ongoing";
                    new_order.menu_image=req.file.menu.path; // to be checked..
                    new_order.order_detail=[];

                    setTimeout(function () {
                        new_order.users_invited=farr;
                        new_order.save(function (err) {
                            if(err){
                                console.log("order saving in db failed !! "+err);
                            }else {
                                console.log("order saved !!");

                                //insert into activity...
                                var activitySc=new schema(
                                    {
                                        _id:Number,
                                        name:String,
                                        email:String,
                                        img:String,
                                        activity:String

                                    }
                                );
                                var activity=mongoose.model("activities", activitySc);
                                var new_activity=new activity();
                                activity.find({

                                },
                                ['_id'],
                                {
                                    sort:{
                                        _id:-1
                                    }
                                },function (err,y) {

                                    console.log("activity y "+y);
                                    if (y.length<1) {
                                            new_order._id=1;
                                    }else {
                                            new_activity._id=y[0]._id+1;
                                        }
                                            console.log("query email "+ req.session.passport.user);
                                            mongoose.model("users").find({email:req.session.passport.user},['name',"img"],{},function (err,u) {
                                                console.log("activity user "+u);
                                                console.log("activity user _id"+u[0]._id);
                                                //console.log("activity user "+JSON.parse(u));
                                                console.log("activity user name "+u[0].name);
                                                console.log(u.name);
                                                console.log("activity user image "+u[0].img);
                                                console.log(u.img);
                                                new_activity.name=u[0].name;
                                                new_activity.email=req.session.passport.user;
                                                new_activity.img=u[0].img; // tbc..
                                                new_activity.activity="create new order";
                                                new_activity.save(function (err) {
                                                    if (err) {
                                                        console.log("error saving activity in db : " + err);
                                                    }else {
                                                        console.log("activity saved successfully in db");
                                                    }
                                            });

                                            });
                                        }


                                );


                                // save notifications :
                                var arr=JSON.parse(fields.invited_friends);
                                for (var name in arr) {

                                    mongoose.model("users").find({name:arr[name]},["_id"],{},function (err,mailarr) {
                                        var mail= mailarr[0]._id;
                                        console.log("notification mail "+ mail);
                                        console.log("notification mailarr "+ mailarr);
                                        console.log("notification mail "+ mailarr._id);
                                        console.log("notification name "+ name);
                                        console.log("notification mail "+ arr[name]);
                                        var usr1;
                                        console.log("mail "+mail);
                                        users.find({
                                            email:req.session.passport.user
                                        },
                                        ['name'],{},function (err,u) {
                                            usr1=u[0].name;
                                            console.log("usr1 "+ usr1);
                                            notifications.update(
                                                {
                                                    _id:mail
                                                },
                                                {
                                                    "$push":{
                                                        notifications:{
                                                            message:
                                                            usr1
                                                            +
                                                            " invites you to "
                                                            +
                                                            fields.order_type,
                                                            is_invited:true,
                                                            is_read:false
                                                        }
                                                    }
                                                },
                                                {
                                                     multi: true ,
                                                     upsert: true
                                                 },
                                                 function (err,n) {
                                                    if (err) {
                                                        console.log("error notifications update"+err);
                                                    }else {
                                                        console.log("updated " + n + " fields !");

                                                    }
                                                }
                                            );
                                        });

                                    });

                                }



                            }
                        });

                    },200
                    );
                }


        );

        }else {
            console.log("nothing saved .. wrong data from client !!");

        }


        ///////////////////////////////////////////////////////////////////////

     });



        resp.redirect("/order");//,{title:"Orders",username:req.session.passport.name , img:req.session.passport.img});



});




module.exports = router;
