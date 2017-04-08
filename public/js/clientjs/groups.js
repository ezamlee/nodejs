var popGroupCard = function(groupname){
    return `
            <div class="col-lg-2 col-md-4 col-sm-6 col-xs-12" style="margin:5px;">
                <div class="grp">
                    <a href="" data-toggle="modal" data-target="#friendslist"><h3 class="text-info"><u>${groupname}</u></h3></a>
                    <button class="btn btn-danger groupremover" data-toggle="modal" data-target="#removeGroup" value="${groupname}">Remove</button>
                </div>
            </div>

                    `;
};



var list_group = function(){
    $.ajax({
        url:"groups/list",
        success:(data)=>{
            $("#grouper").html("");
            data.forEach(function(obj){
                $("#grouper").append(popGroupCard(obj.name));
            })
        },
        fail:(err) => {
          display_error("Server Error please try again")
        }
    });
};

$(document).ready(() => {
    list_group();
    var group2remove;
    $("html").on("click",".groupremover",(e) => {
        $('span.text-info:nth-child(1)').text(e.target.value);
        group2remove = e.target.value
    })
    $("html").on("click","button#1.btn.btn-info", (e)=>{
        $.ajax({
            url:"/groups/"+group2remove,
            method:"DELETE",
            success : (data) =>{
                list_group();
                console.log(data);
            },
            fail : (err) => {
                display_error("Server Error please try again")
            }
        })
    })

<<<<<<< HEAD
=======
    $("#btAddGroup").click((e)=>{
        var my_group_list = [];
        $.ajax({
            url:"groups/list",
            success:(data)=>{
                data.forEach((obj) => {
                    my_group_list[my_group_list.length] = obj.name.toLowerCase();
                })
                if(!my_group_list.includes($("#newGroupName").val().toLocaleLowerCase())){
                    $.ajax({
                       url:"groups/"+$("#newGroupName").val().toLocaleLowerCase(),
                       method:"PUT",
                       success :(data) => {
                           console.log("group add" + data);
                           list_group();
                           display_error("Group Added")
                       },
                      fail : (err) => {
                          display_error("Server Error please try again")
                      }
                        
                    })
                }else{
                    console.log("eror")
                    display_error("Group Name Already Exists");
                }                
            },
            fail:(err) => {
                console.log(err);
            }
        });
        
    })
>>>>>>> 543d3b352cd17f8c662f0b20c6dd9f412390efbd


})
