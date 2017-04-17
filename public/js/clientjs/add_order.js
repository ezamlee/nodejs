


$(document).ready(function ()  {

    var order_type= $("#order_type input[checked=true]").innerText;
    var restaurant_name= $("#restaurant_name input").text;

    //testing

    var invited_friends=["Heba Bahaa"];
    var obj={email:"ahmed@gmail.com",order_type:"Lunch",restaurant_name:"KFC",invited_friends:invited_friends};
    // console.log(JSON.stringify(obj));
    var stuff = JSON.stringify(obj);

//data:{email:"ahmed@gmail.com",order_type:"Lunch",restaurant_name:"KFC",invited_friends:invited_friends,menu:formData}
    //////
    $("#logbtsubmit").on("click",function(e){
        //e.preventDefault();
        e.preventDefault();
        var er=false;
        // console.log("submit");
        // console.log($('#menu')[0].files[0]);
        var menu;
        if ($('#menu')[0].files.length>0) {
            menu = JSON.stringify($('#menu')[0].files[0]);
        }else {
            er=true;
            display_error("Choose Menu");
        }

        // console.log(menu);
        var i_f=[];
        $("#demo-cs-multiselect option:selected").each(function (op) {
            // console.log("==================="+$(this).attr("value"));
            // console.log($(this).attr("selected"));
            //if ($(this).attr("selected")) {
                i_f.push($(this).attr("value"));
            //}
        });
        if (i_f.length<1) {
            er=true;
            display_error("Choose friends to invite");
        } else {

        }
        var o_t="";
        $("#ordertype input:checked").each(function (inp) {
            // console.log("--------------"+$(this).attr("value"));
            //if ($(this).checked) {
                o_t=$(this).attr("value");
            //}
        });
        if (o_t.length<1) {
            er=true;
            display_error("Select Meal type");
        }
        var r_n=$("#demo-text-input").val();
        if (r_n==null || r_n.length<1) {
            er=true;
            display_error("Enter Restaurant name");
        }
        if (!er) {
            var invited_friends=JSON.stringify(i_f);
            var formData = new FormData();
            formData.append('menu', $('#menu')[0].files[0]);
            //formData.append('email', req.session.passport.user);
            formData.append('order_type', o_t);
            formData.append('restaurant_name', r_n);
            formData.append('invited_friends', invited_friends);

            // console.log(formData);
            // console.log(formData.menu);
            // console.log(formData.email);
            // console.log(formData.order_type);
            // console.log(formData.restaurant_name);
            // console.log(formData.invited_friends);

            $.ajax({
                url:"/add",
                method:"POST",

                processData: false, contentType: false,
                data:formData,
                success : (data) =>{

                     console.log("success.. response from server ..");
                     console.log(data);
                    // console.log(data.error);
                    // //console.log(JSON.parse(data));
                    // console.log(JSON.stringify(data));

                    if (data.includes("error")) {
                        er=true;

                        if (data.includes("type")) {
                                display_error("Meal type error");
                        }else if (data.includes("name")) {
                            display_error("Restaurant name error");
                        }else if (data.includes("friends")) {
                            display_error("Invited friends error");
                        }else if (data.includes("image")) {
                            display_error("Menu image error");
                        }
                    }

                    if (!er) {
                        console.log("no error");
                        //listNotifications();
                            // $.ajax({
                            //     method:"GET",
                            //     url:"/order"
                            // })
                            $("#sbmtfrm").submit();
                    }else {

                        //display_error("Invalid data");
                    }
                },
                fail : (err) => {
                    console.log(err);
                    display_error(err);
                },
                complete:(msg)=>{
                    if (msg) {
                        // console.log(msg.error);
                        // console.log(msg);
                    }
                }
            })
        }



    })
    // $("#logbtsubmit").on("submit",function (e) {
    //     //e.preventDefault();
    //     $.ajax({
    //         url:"/order",
    //         method:"GET",
    //         success : (data) =>{
    //
    //              console.log("success.. response from server ..");
    //             // console.log(data);
    //             // console.log(data.error);
    //             // //console.log(JSON.parse(data));
    //             // console.log(JSON.stringify(data));
    //
    //
    //
    //         },
    //         fail : (err) => {
    //             console.log(err);
    //             display_error(err)
    //         }
    //     });
    // })

    $("#demo-cs-multiselect option").on("select",function(e){

        var g;
        usrData.groups.forEach(function (gr) {
            if (this.value==gr) {
                g=gr;
                //break;
            }
        });

    });

})
