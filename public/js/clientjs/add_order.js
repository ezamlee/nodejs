


$(document).ready(function ()  {

    var order_type= $("#order_type input[checked=true]").innerText;
    var restaurant_name= $("#restaurant_name input").text;

    //testing

    var invited_friends=["Heba Bahaa"];
    var obj={email:"ahmed@gmail.com",order_type:"Lunch",restaurant_name:"KFC",invited_friends:invited_friends};
    console.log(JSON.stringify(obj));
    var stuff = JSON.stringify(obj);

//data:{email:"ahmed@gmail.com",order_type:"Lunch",restaurant_name:"KFC",invited_friends:invited_friends,menu:formData}
    //////
    $("#logbtsubmit").on("click",function(e){
        console.log("submit");
        console.log($('#menu')[0].files[0]);
        var menu = JSON.stringify($('#menu')[0].files[0]);
        console.log(menu);
        var invited_friends=JSON.stringify(["Heba Bahaa"]);
        var formData = new FormData();
        formData.append('menu', $('#menu')[0].files[0]);
        formData.append('email', "ahmed@gmail.com");
        formData.append('order_type', "Lunch");
        formData.append('restaurant_name', "KFC");
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
                console.log(data.error);
                //console.log(JSON.parse(data));
                console.log(JSON.stringify(data));



            },
            fail : (err) => {
                console.log(err);
                display_error(err)
            },
            complete:(msg)=>{
                if (msg) {
                    console.log(msg.error);
                    console.log(msg);
                }
            }
        })
    })



})
