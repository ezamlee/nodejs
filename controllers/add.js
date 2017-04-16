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

// var logins = require("../models/logins.js");
// var users = require("../models/users.js");
// var orders = require("../models/orders.js");
// var notifications = require("../models/notifications.js");
var async = require("async");
//

function dummyData(req) {
    var id = "ahmed@gmail.com";
    //router.use("/",function (req,res,next) {
        req.session.passport.user=id;
    //    next();
    //});
}
//req.session.passport.user
router.use("/",(req,resp,next)=>{

    //initialize dummy data..
    //dummyData(req);
    //
//req.session.user=req.session.passport.user;

    if(!(req.session.passport.user)){
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
//
// router.get("/", function (req, resp) {
//         resp.render("add_order", { title: "Make Order", username:req.session.name , img:req.session.img});
// })


/* var userSc=new schema(
    {
        password:String,
        name:String,
        email:String,
        img:String,
        groups:[
            {
                name:String,
                members:[
                    String
                ]
            }
        ],
        order:[
            Number
        ],
        friends:[
            String
        ]
    }
); */
//mongoose.connect("mongodb://127.0.0.1:27017/NodeProject");
//var model= new mongoose.model("users",userSc);
//mongoose.model("users",userSc);


//


// var respObj={
//     title:"Make Order",
//     usrData:{}
// };

//opening the page...
// .. need to know how is the session managed in order to identify the requestig user ... since we're using "client-sessions" then data is sent on request body ...
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

    // var x=new orders();
    // var newid;
    // orders.find({
    //
    // },
    // ['_id'],
    // {
    //     sort:{
    //         _id:-1
    //     }
    // },function (err,y) {
    //
    //     console.log("orders y from db "+y);
    //
    //             newid=y[0]._id;
    //         }
    //
    //
    // );

    //resp.render("add_order",{ title: "Make Order", username:req.session.name , img:req.session.img});


})


router.use(function (req,res,next) {
    console.log("req method "+req.method);
    if (req.method.startsWith("POST")) {
        //router.use(uploadedfileMiddleware.single("menu"))
        //console.log("uploadedfileMiddleware added");
        console.log("req body "+req.body);
        //console.log(req.body.stuff);
        //req.body=JSON.parse(req.body.stuff);
        //temporary... just for testing...
        //req.body.email="ahmed@gmail.com"
    }
    next();
});

// to submit a new order...
router.post("/",bodyParser.urlencoded({extended:false}),function(req,resp){
    console.log("POST on / ...");
    var ok = true;
    /* var orderSc=new schema(
        {
            _id:Number,
            owner:String,
            meal:String,
            restaurant_name:String,
            users_invited:[String],
            users_joined:[String],
            status:String,
            menu:String,
            order_detail:[
                {
                    _id:String,
                    name:String,
                    item:String,
                    amount:Number,
                    price:Number,
                    comment:String
                }
            ]
        }
    ); */

    // console.log(req.body);
    // console.log(req.body.menu);
    // console.log(req.body.email);
    // console.log(req.body.order_type);
    // console.log(req.body.restaurant_name);
    // console.log(req.body.invited_friends);
    // console.log(req.body.get("menu"));
    // console.log(req.body.get("email"));
    // console.log(req.body.get("order_type"));
    // console.log(req.body.get("restaurant_name"));
    // console.log(req.body.get("invited_friends"));


    //validation

    var form = new formidable.IncomingForm();



    // store menus in the /public/img/menu/ directory
    form.uploadDir =  './public/img/menu/';
    form.on('file', function(field, file) {

    //fs.rename(file.path, path.join(form.uploadDir, file.name));
    // fs.writeFile(file.path, 'Hello World!', function (err) {
    // if (err)
    //     return console.log(err);
    // console.log('Hello World > helloworld.txt');
    // });

//     // fs.writeFile(file.path, file, function(err) {
//     // if(err) {
//     //     return console.log(err);
//     // }
//
    console.log("file recieved!");
// });
    });

  // log any errors that occur >_<
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    if (ok) {
            resp.end('success');
            console.log("form end success");
    }
  });

  form.parse(req, function(err, fields, file) {
        // ...
        req.file=file;
        console.log("file neme"+file.menu.name);
        console.log("file "+file);
        console.log(file);

        console.log("req file neme"+req.file.menu.name);
        //console.log(fields);


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
            //resp.abort();
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
            //resp.abort();
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
            //resp.abort();
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
            //resp.status(400).send("menu image error");
            resp.locals={"error":"menu image error"}
            resp.write("menu image error");
            resp.status(400).end();
            //req.abort();
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

                    new_order._id=y[0]._id+1;
                    console.log("new_order._id  "+new_order._id);
                    new_order.owner=req.session.passport.user;
                    new_order.meal=fields.order_type;
                    new_order.restaurant_name=fields.restaurant_name;
                    new_order.users_invited=JSON.parse(fields.invited_friends);
                    new_order.users_joined=[];
                    new_order.status="waiting";
                    new_order.menu_image=req.file.menu.path; // to be checked..
                    new_order.order_detail=[];
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

                                        new_activity._id=y[0]._id+1;
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
                            //notifications._id=req.session.passport.user;


                        }
                    });

                }


        );
        }else {
            console.log("nothing saved .. wrong data from client !!");

        }
        // console.log("req.session.passport.user "+req.session.passport.user);
        // console.log("fields.order_type "+ fields.order_type);
        // console.log("fields.restaurant_name "+fields.restaurant_name);
        // console.log("fields.invited_friends " +JSON.parse(fields.invited_friends));
        // console.log( fields.menu);
        // console.log(req.file.path);

        ///////////////////////////////////////////////////////////////////////

/*
    if (
                    (
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
                    )
                    &&
                    (
                        fields.restaurant_name != null
                    )
                    &&
                    (
                        fields.restaurant_name != ""
                    )
                    &&
                    (
                        JSON.parse(fields.invited_friends) != null
                    )
                    &&
                    (
                        JSON.parse(fields.invited_friends).length > 0
                    )

                    &&
                    (
                        file==null
                        ||
                        (
                            file.size<30000000
                            &&
                            file.mimetype.startsWith("image")
                        )
                    )
                )    {

        console.log("POST tests passed !");
        //save order
                    //var order=mongoose.model("orders", orderSc);
                    // var new_order=new orders();
                    // new_order._id=orders.find({
                    //
                    //     },
                    //         {
                    //             _id:true
                    //         }
                    // ).sort(
                    //     {
                    //         _id:-1
                    //     }
                    // ).limit(1)._id + 1;
                    // new_order.owner=req.session.passport.user;
                    // new_order.meal=fields.order_type;
                    // new_order.restaurant_name=fields.restaurant_name;
                    // new_order.users_invited=JSON.parse(fields.invited_friends);
                    // new_order.users_joined=[];
                    // new_order.status="waiting";
                    // new_order.menu=req.file.path; // to be checked..
                    // new_order.order_detail=[];
                    // new_order.save(function (err) {
                    //     if(err){
                    //         console.log("order saving in db failed !!");
                    //     }else {
                    //         console.log("order saved !!");
                    //
                    //         //insert into activity...
                    //         var activitySc=new schema(
                    //             {
                    //                 _id:Number,
                    //                 name:String,
                    //                 email:String,
                    //                 img:String,
                    //                 activity:String
                    //
                    //             }
                    //         );
                    //         var activity=mongoose.model("activities", activitySc);
                    //         var new_activity=new activity();
                    //         new_activity._id=activity.find({
                    //
                    //             },
                    //                 {
                    //                     _id:true
                    //                 }
                    //         ).sort(
                    //             {
                    //                     _id:-1
                    //             }
                    //         ).limit(1)._id + 1;
                    //         new_activity.name=mongoose.model("users").find({email:req.session.passport.user},{name:true}).name;
                    //         new_activity.email=req.session.passport.user;
                    //         new_activity.img=req.file.path; // tbc..
                    //         new_activity.activity="create new order";
                    //         new_activity.save(function (err) {
                    //             if (err) {
                    //                 console.log("error saving activity in db : " + err);
                    //             }else {
                    //                 console.log("activity saved successfully in db");
                    //             }
                    //         });
                    //
                    //         // save notifications :
                    //         for (var mail in JSON.parse(fields.invited_friends)) {
                    //
                    //             notifications.update(
                    //                 {
                    //                     _id:mail
                    //                 },
                    //                 {
                    //                     "$push":{
                    //                         notifications:{
                    //                             message:users.find({
                    //                                 email:req.session.passport.user
                    //                             },
                    //                             {
                    //                                 name:true
                    //                             }).name
                    //                             +
                    //                             " invites you to "
                    //                             +
                    //                             fields.order_type,
                    //                             is_invited:true,
                    //                             is_read:false
                    //                         }
                    //                     }
                    //                 },
                    //                 {
                    //                      multi: true ,
                    //                      upsert: true
                    //                  },
                    //                  function (err,n) {
                    //                     if (err) {
                    //                         console.log("error notifications update"+err);
                    //                     }else {
                    //                         console.log("updated " + n + " fields !");
                    //                     }
                    //                 }
                    //             );
                    //
                    //         }
                    //         //notifications._id=req.session.passport.user;
                    //
                    //
                    //     }
                    // });
        }else {
            console.log("POST tests failed");
        }
        */
     });

    // console.log("form "+form);
    // console.log("form.menu "+form.menu);
    // console.log("form.email "+form.email);
    // console.log("form.order_type "+form.order_type);
    // console.log("form.restaurant_name "+form.restaurant_name);
    // console.log("form.invited_friends "+form.invited_friends);

    // // testing tests !!!
    // //var body = JSON.parse(re);
    // // if((req.body.order_type=="Breakfast")||(req.body.order_type=="Lunch")||(req.body.order_type=="Dinner"))
    // // {
    // //     console.log("req.body.order_type OK");
    // //     console.log(req.body.order_type);
    // //
    // // }else {
    // //     console.log("req.body.order_type FAIL");
    // //
    // // }
    // // if ((req.body.restaurant_name != null)&&(req.body.restaurant_name != "")) {
    // //     console.log("req.body.restaurant_name OK");
    // //     console.log(req.body.restaurant_name);
    // //
    // // }else {
    // //     console.log("req.body.restaurant_name FAIL");
    // //
    // // }
    // // if ((JSON.parse(req.body.invited_friends) != null)&&(JSON.parse(req.body.invited_friends).length > 0)) {
    // //     console.log("req.body.invited_friends OK");
    // //     console.log(JSON.parse(req.body.invited_friends));
    // // } else {
    // //     console.log("req.body.invited_friends FAIL");
    // // }
    // // if (req.body.invited_friends != null) {
    // //     console.log("req.body.invited_friends != null");
    // //     console.log(req.body.invited_friends);
    // // } else {
    // //     console.log("req.body.invited_friends = null");
    // // }
    // // if (req.body.invited_friends.length > 0) {
    // //     console.log("req.body.invited_friends.length > 0");
    // //     console.log(req.body.invited_friends);
    // // } else {
    // //     console.log("req.body.invited_friends.length <= 0");
    // // }
    // //
    // // if ((req.body.menu.size<30000000 && req.body.menu.mimetype.startsWith("image"))) {
    // //     console.log("req.body.menu OK");
    // //
    // //     console.log(req.body.menu);
    // //     console.log(JSON.parse(req.body.menu));
    // //     console.log(req.body.menu.mimetype);
    // //     console.log(JSON.parse(req.body.menu).mimetype);
    // // } else {
    // //     console.log("req.body.menu FAIL");
    // //     console.log(req.body.menu.mimetype);
    // //     console.log(JSON.parse(req.body.menu).mimetype);
    // // }
    // // if ((req.file.size<30000000 && req.file.mimetype.startsWith("image"))) {
    // //     console.log("req.file OK");
    // //     console.log(req.file);
    // // } else {
    // //     console.log("req.file FAIL");
    // // }
    // // end testing tests
    //
    //
    // if (
    //     (
    //         (
    //             req.body.order_type=="Breakfast"
    //         )
    //         ||
    //         (
    //             req.body.order_type=="Lunch"
    //         )
    //         ||
    //         (
    //             req.body.order_type=="Dinner"
    //         )
    //     )
    //     &&
    //     (
    //         req.body.restaurant_name != null
    //     )
    //     &&
    //     (
    //         req.body.restaurant_name != ""
    //     )
    //     &&
    //     (
    //         req.body.invited_friends != null
    //     )
    //     &&
    //     (
    //         req.body.invited_friends.length > 0
    //     )
    //     /* check on type image and image size ...*/
    //     &&
    //     (
    //         req.file==null
    //         ||
    //         (
    //             req.file.size<30000000
    //             &&
    //             req.file.mimetype.startsWith("image")
    //         )
    //     )
    // )    {
    //
    //     console.log("POST tests passed !");
    //     //save order
    //     //var order=mongoose.model("orders", orderSc);
    //     var new_order=new orders();
    //     new_order._id=orders.find({
    //
    //         },
    //             {
    //                 _id:true
    //             }
    //     ).sort(
    //         {
    //             _id:-1
    //         }
    //     ).limit(1)._id + 1;
    //     new_order.owner=req.body.email;
    //     new_order.meal=req.body.order_type;
    //     new_order.restaurant_name=req.body.restaurant_name;
    //     new_order.users_invited=req.body.invited_friends;
    //     new_order.users_joined=[];
    //     new_order.status="waiting";
    //     new_order.menu=req.file.path; // to be checked..
    //     new_order.order_detail=[];
    //     new_order.save(function (err) {
    //         if(err){
    //             console.log("order saving in db failed !!");
    //         }else {
    //             console.log("order saved !!");
    //
    //             //insert into activity...
    //             var activitySc=new schema(
    //                 {
    //                     _id:Number,
    //                     name:String,
    //                     email:String,
    //                     img:String,
    //                     activity:String
    //
    //                 }
    //             );
    //             var activity=mongoose.model("activities", activitySc);
    //             var new_activity=new activity();
    //             new_activity._id=activity.find({
    //
    //                 },
    //                     {
    //                         _id:true
    //                     }
    //             ).sort(
    //                 {
    //                         _id:-1
    //                 }
    //             ).limit(1)._id + 1;
    //             new_activity.name=mongoose.model("users").find({email:req.body.email},{name:true}).name;
    //             new_activity.email=req.body.email;
    //             new_activity.img=req.file.path; // tbc..
    //             new_activity.activity="create new order";
    //             new_activity.save(function (err) {
    //                 if (err) {
    //                     console.log("error saving activity in db : " + err);
    //                 }else {
    //                     console.log("activity saved successfully in db");
    //                 }
    //             });
    //
    //             // save notifications :
    //             for (var mail in req.body.invited_friends) {
    //
    //                 notifications.update(
    //                     {
    //                         _id:mail
    //                     },
    //                     {
    //                         "$push":{
    //                             notifications:{
    //                                 message:users.find({
    //                                     email:req.body.email
    //                                 },
    //                                 {
    //                                     name:true
    //                                 }).name
    //                                 +
    //                                 " invites you to "
    //                                 +
    //                                 req.body.order_type,
    //                                 is_invited:true,
    //                                 is_read:false
    //                             }
    //                         }
    //                     },
    //                     {
    //                          multi: true ,
    //                          upsert: true
    //                      },
    //                      function (err,n) {
    //                         if (err) {
    //                             console.log("error notifications update"+err);
    //                         }else {
    //                             console.log("updated " + n + " fields !");
    //                         }
    //                     }
    //                 );
    //
    //             }
    //             //notifications._id=req.body.email;
    //
    //
    //         }
    //     });
    //
    //     //render orders or order details ..
    //
    //     //code to load all orders, in order to send them as response or load orders page...
    //
    //     // order.find(function (err,data) {
    //     //     if (err) {
    //     //         console.log(err);
    //     //     }else {
    //     //         console.log("order list retrieved successfully!");
    //     //     }
    //     //
    //     //
    //     //     ordObj={name:"Order List",orders:data };
    //     //     resp.locals=ordObj;
    //     // })
    //     //
    //     // //resp.send(req.body)
    //     //
    //     // resp.render("product/list");
    //
    // }else {
    //     console.log("POST tests failed");
    // }





});




module.exports = router;
