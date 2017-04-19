


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
        $("ul.chosen-choices li.search-choice").each(function (op) {

                i_f.push($(this).find("span").text());

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
                                // console.log("update_all");
                                //
                                // console.log(data);
                                update_all(JSON.parse(data));

                            }
                        })

                        setTimeout(function () {
                                $("#sbmtfrm").submit();
                        },200);
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
        $("ul.chosen-choices li.search-choice").each(function (li) {
            //var g2=li.find("span").innerText;
            var g2 = $(this).find("span").text();

            console.log("group= "+g2);
            //"<%usrData.groups.forEach(function (gr) {%>"
            $.ajax({
            url:"/add/getgroupnames",
            method:"GET",
                success:(grouparr)=>{
                    console.log("grouparr "+grouparr);
                    console.log(grouparr);
                    console.log(JSON.stringify(grouparr));
                    console.log(JSON.parse(grouparr));
                    JSON.parse(grouparr).forEach(function (gr) {
                        if (g2==gr) {
                            g=gr;
                            //break;
                        }
                    });

                }
            });

        setTimeout(function () {
            if (g!="") {
                console.log("g!=fadi");
                console.log(g);
                $(this).remove();
                $.ajax({
                    url:"/add/getgroup",
                    method:"POST",
                    data:{gname:g},
                    success:(gnames)=>{
                        console.log(gnames);
                        $("ul.chosen-choices li.search-choice").each(function () {
                            if ($(this).text().indexOf(g) >= 0 ) {
                                $(this).remove();
                            }
                                // console.log("====================================");
                                // console.log($(this).attr("selected"));
                                //
                                // $(this).attr("selected",true);
                                // console.log("----------------------------------");
                                // console.log($(this).attr("selected"));
                                // $("ul.chosen-choices li.search-choice").each(function () {
                                //     if ($(this).text().indexOf("g") >= 0) {
                                //         $(this).remove();
                                //     }
                                // })
                        });
                        $("ul.chosen-results li.result-selected").each(function () {
                            if ($(this).text().indexOf(g) >= 0 ) {
                                $(this).attr("class","active-result");
                                console.log($(this).attr("class"));
                            }
                        });

                        JSON.parse(gnames).forEach(function (ggname) {
                            //display_error(gname);

                            $("ul.chosen-choices").prepend($("<li class='search-choice'><span>"+ggname+"</span> <a data-option-array-index='0' class='search-choice-close'></a></li>"));

                            $("ul.chosen-results li.result-selected").each(function () {
                                if ($(this).text().indexOf(ggname) >= 0 ) {
                                    $(this).attr("class","result-selected");
                                    console.log($(this).attr("class"));
                                }
                            });
                            //console.log($("#demo-cs-multiselect").text());

                            // $("ul.chosen-choices").innerText="<li class='search-choice'><span><%=gname%></span> <a data-option-array-index='0' class='search-choice-close'>::before</a></li>"+ $("ul.chosen-choices").innerText;
                            // console.log($("ul.chosen-choices").innerText);
                        });

                    }
                });
            }else {
                console.log("g = fadi");
            }
        },200);

            //"<%});%>"


        });


    });

})
