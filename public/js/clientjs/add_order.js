


$(document).ready(function ()  {

    var order_type= $("#order_type input[checked=true]").innerText;
    var restaurant_name= $("#restaurant_name input").text;


    $("#logbtsubmit").on("click",function(e){

        e.preventDefault();
        var er=false;
        var menu;
        if ($('#menu')[0].files.length>0) {
            menu = JSON.stringify($('#menu')[0].files[0]);
        }else {
            er=true;
            display_error("Choose Menu");
        }

        var i_f=[];
        $("#demo-cs-multiselect option:selected").each(function (op) {

                i_f.push($(this).attr("value"));

        });
        if (i_f.length<1) {
            er=true;
            display_error("Choose friends to invite");
        }
        var o_t="";
        $("#ordertype input:checked").each(function (inp) {
                o_t=$(this).attr("value");
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
            formData.append('order_type', o_t);
            formData.append('restaurant_name', r_n);
            formData.append('invited_friends', invited_friends);

            $.ajax({
                url:"/add",
                method:"POST",

                processData: false, contentType: false,
                data:formData,
                success : (data) =>{

                     console.log("success.. response from server ..");
                     console.log(data);

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
                        $.ajax({
                            url:"/add/invited",
                            method:"GET",
                            success : (data) =>{
                                console.log("update_all");
                                update_all(data);
                                //console.log(JSON.parse(data)[0]);
                            }
                        })

                        $("#sbmtfrm").submit();
                    }
                },
                fail : (err) => {
                    console.log(err);
                    display_error(err);
                },
                // complete:(msg)=>{
                //     if (msg) {
                //         // console.log(msg.error);
                //         // console.log(msg);
                //     }
                // }
            })
        }



    })

    $("#demo-cs-multiselect").on("change",function(e){

        console.log("change");
        var g="";
        //$("ul.chosen-choices .search-choice").forEach(function (li) {
        $("#demo-cs-multiselect option:selected").each(function (li) {
            //var g2=li.find("span").innerText;
            var g2 = $(this).attr("value");
            console.log("group= "+g2);
            //"<%usrData.groups.forEach(function (gr) {%>"
            $.ajax({
            url:"/add/getgroupnames",
            method:"GET",
                success:(grouparr)=>{
                    console.log("grouparr "+grouparr);
                    grouparr.forEach(function (gr) {
                        if (g2==gr) {
                            g=gr;
                            //break;
                        }
                    });

                }
            });

        setTimeout(function () {
            if (g!="") {
                $(this).remove();
                $.ajax({
                    url:"/add/getgroup",
                    method:"GET",
                    data:{gname:g},
                    success:(gnames)=>{

                        gnames.forEach(function (gname) {
                            $("ul.chosen-choices").innerText="<li class='search-choice'><span><%=gname%></span> <a data-option-array-index='0' class='search-choice-close'>::before</a></li>"+ $("ul.chosen-choices").innerText;
                            console.log($("ul.chosen-choices").innerText);
                        });

                    }
                });
            }
        },200);

            //"<%});%>"


        });


    });

})
