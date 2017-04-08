var groupname;
var list_m = function(groupname){
            $("#groupMembers").html("")
            $.ajax({
                url: "groups/m/" + groupname,
                method: "get",
                success: (data) => {
                    var mlist = data[0].groups[0].members;
                    mlist.forEach((str) => {
                         $.ajax({
                            url: "/api/user/" + str,
                            method: "get",
                            success: (data) => {
                                data = data[0]
                                $("#groupMembers").append(memberTem(data.img, data.name, data._id));
                            },
                            fail: (err) => {
                                display_error("sERVER eRROR");
                            }
                        })
                    })
                },
                fail: (err) => {
                    display_error("server error");
                }
            })
        }
var memberTem = function (img, name, email) {
    return `
                        <div class="col-xs-4" style="margin:2px 0px">
                            <a href="img/${img}">
                                <img src="img/${img}" class="img-responsive">
                            </a>
                            <h4>${name}</h4>
                            <h4>${email}</h4>
                            <button class="btRemove btn btn-danger" value="${email}" >Remove</button>
                        </div>
                            `
}
var popGroupCard = function (groupname) {
    return `
            <div class="col-lg-2 col-md-4 col-sm-6 col-xs-12" style="margin:5px;">
                <div class="grp">
                    <a href="" data-toggle="modal" data-target="#friendslist"><h3 class="text-info groupname"><u>${groupname}</u></h3></a>
                    <button class="btn btn-danger groupremover" data-toggle="modal" data-target="#removeGroup" value="${groupname}">Remove</button>
                </div>
            </div>

                    `;
};
var list_group = function () {
    $.ajax({
        url: "groups/list",
        success: (data) => {
            $("#grouper").html("");
            data.forEach(function (obj) {
                $("#grouper").append(popGroupCard(obj.name));
            })
        },
        fail: (err) => {
            display_error("Server Error please try again")
        }
    });
};
$(document).ready(() => {
    list_group();
    var group2remove;
    $("html").on("click", ".groupremover", (e) => {
        $('span.text-info:nth-child(1)').text(e.target.value);
        group2remove = e.target.value
        console.log('group2remove: ', group2remove);
        console.log($('span.text-info:nth-child(1)'));
    })
    $("html").on("click", "button#1.btn.btn-info", (e) => {
        $.ajax({
            url: "/groups/" + group2remove,
            method: "DELETE",
            success: (data) => {
                list_group();
                
            },
            fail: (err) => {
                display_error("Server Error please try again")
            }
        })
    })
    $("#btAddGroup").click((e) => {
        var my_group_list = [];
        $.ajax({
<<<<<<< HEAD
            url:"groups/list",
            success:(data)=>{
              console.log('data', data);
=======
            url: "groups/list",
            success: (data) => {
>>>>>>> 7e905dd386029d1bd81b50a53d28a106d9313e86
                data.forEach((obj) => {
                    my_group_list[my_group_list.length] = obj.name.toLowerCase();
                })
                if (!my_group_list.includes($("#newGroupName").val().toLocaleLowerCase())) {
                    $.ajax({
<<<<<<< HEAD
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
=======
                        url: "groups/" + $("#newGroupName").val().toLocaleLowerCase(),
                        method: "PUT",
                        success: (data) => {
                            list_group();
                            display_error("Group Added")
                        },
                        fail: (err) => {
                            display_error("Server Error please try again")
                        }
>>>>>>> 7e905dd386029d1bd81b50a53d28a106d9313e86

                    })
                } else {
                    display_error("Group Name Already Exists");
                }
            },
            fail: (err) => {
                            }
        });

    })
    $("html").on("click", ".groupname", (e) => {
        groupname = e.target.innerText || e.target.children[0].innerText;
        list_m(groupname);
    })
<<<<<<< HEAD

})
=======
        $("html").on("click",".btRemove",(ev) =>{
            $.ajax({
                url:`/groups/remove/${groupname}/${ev.target.value}`,
                method:"delete",
                success:(data)=>{
                    display_error("user removed");
                },
                fail : (data)=>{
                    display_error("server eRROR")
                }
            })
            list_m(groupname)
        })
        $("#btAddFriend").click((eve)=>{
            var email = $("#addFriendEmail").val();
            $.ajax({
                url:`/groups/add/${groupname}/${email}`,
                method:"put",
                success:(data) =>{
                    display_error(data);
                },
                fail:(err)=>{
                  display_error("server error try again later");  
                }
            })
            list_m(groupname);
        })
    
})
>>>>>>> 7e905dd386029d1bd81b50a53d28a106d9313e86
