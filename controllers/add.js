var express = require("express");
var bodyParser=require("body-parser");
var router = express.Router();

var mongoose = require("mongoose");
var schema = mongoose.Schema;
var userSc=new schema(
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
);
mongoose.connect("mongodb://127.0.0.1:27017/NodeProject");
//var model= new mongoose.model("users",userSc);
mongoose.model("users",userSc);


//


var respObj={
    title:"Make Order",
    usrData:{}
};

//opening the page...
// .. need to know how is the session managed in order to identify the requestig user ...
router.get("/",function(req,resp){
    var tmpdata;
    mongoose.model("users").findOne({"email":
                                        /*email using data from session..*/
                                    },"name img groups friends",function (err,data) {
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

// to submit a new order...
router.post("/",bodyParser.urlencoded({extended:false}),function(req,resp){

    var orderSc=new schema(
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
    );

    //validation

    if (
        (
            (
                req.body.order_type=="Breakfast"
            )
            ||
            (
                req.body.order_type=="Lunch"
            )
            ||
            (
                req.body.order_type=="Dinner"
            )
        )
        &&
        (
            req.body.restaurant_name != null
        )
        &&
        (
            req.body.restaurant_name != ""
        )
        &&
        (
            req.body.invited_friends != null
        )
        &&
        (
            req.body.invited_friends.length > 0
        )
        //TO-DO : check on image size ...
    )    {

        //save order
        var order=mongoose.model("orders", orderSc);
        var new_order=new order();
        new_order._id=order.find({

            },
                {
                    _id:true
                }
        ).sort(
            {
                _id:-1
            }
        ).limit(1)._id + 1;
        new_order.owner=req.body.owner;
        new_order.meal=req.body.order_type;
        new_order.restaurant_name=req.body.restaurant_name;
        new_order.users_invited=req.body.invited_friends;
        new_order.users_joined=[];
        new_order.status="waiting";
        new_order.menu=req.body.img;
        new_order.order_detail=[];
        new_order.save(function (err) {
            if(err){
                console.log("order saving in db failed !!");
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
                new_activity._id=activity.find({

                    },
                        {
                            _id:true
                        }
                ).sort(
                    {
                            _id:-1
                    }
                ).limit(1)._id + 1;
                new_activity.name=mongoose.model("users").find({email:req.body.owner},{name:true}).name;
                new_activity.email=req.body.owner;
                new_activity.img=req.body.img;
                new_activity.activity="create new order";
                new_activity.save(function (err) {
                    if (err) {
                        console.log("error saving activity in db : " + err);
                    }else {
                        console.log("activity saved successfully in db");
                    }
                });

                // save notifications :

                
            }
        });

        //render orders

        //code to load all orders in order to send them as response or load orders page...

        // order.find(function (err,data) {
        //     if (err) {
        //         console.log(err);
        //     }else {
        //         console.log("order list retrieved successfully!");
        //     }
        //
        //
        //     ordObj={name:"Order List",orders:data };
        //     resp.locals=ordObj;
        // })
        //
        // //resp.send(req.body)
        //
        // resp.render("product/list");

    }





}

module.exports = router;
