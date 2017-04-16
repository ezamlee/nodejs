var friendsBlock = function(id, img, name){
    return `
              <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                <div class="frnd">
                  <img src="img/profile/${img}" class="frndImg">
                  <p class='name'>${name}</p>
                  <p>${id}</p>
                  <button class="btn btn-danger btn-labeled fa fa-times removeFriend" data-toggle="modal" value="${id}" data-target="#${1}">Unfriend</button>
                </div>
              </div>
                    `;
};
var deleteModal = function(id, name){
    return `
            <!-- start remove friend Modal -->
            <div id="${1}" class="modal fade" role="dialog">
              <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Remove Friend</h4>
                  </div>
                  <div class="modal-body">
                    <h5>Are you want to remove <span class="text-info">${name}</span> from your friends</h5>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-info" id="remove" data-dismiss="modal">Remove</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                  </div>
                </div>

              </div>
            </div>
            <!-- end remove friend Modal -->
                    `;
};


var paging = function(){
  return `

        <div class="text-center" style="margin-top: 30px;">
          <ul class="pagination mar-no">
            <li class="disabled"><a class="fa fa-angle-double-left" href="#"></a></li>
            <li class="active"><a href="#">1</a></li>
            <li><a href="#">2</a></li>
            <li><a class="fa fa-angle-double-right" href="#"></a></li>
          </ul>
        </div>

  `;
}


var listFriends = function(){
  $("#friends").html("");
    $.ajax({
        url:"friends/list",
        success:(data)=>{
          data.forEach(function(obj){
            $.ajax({
                url:"/api/user/"+obj,
                method:'get',
                success:(userData)=>{
                  console.log("userData.length = ",userData.length);
                  $("#friends").append(friendsBlock(userData[0]._id, userData[0].img, userData[0].name));
                  $('#friends').append(deleteModal(userData[0]._id, userData[0].name));
                },
                fail:(err) => {
                    display_error("No Friends")
                }
            });
          })
        },
        fail:(err) => {
          display_error("Server Error please try again")
        }
    });
};



$(document).ready(() => {
    listFriends();

    var frndName;
    $("html").on("click", ".removeFriend", (e) => {
        $('span.text-info:nth-child(1)').text(e.target.value);
        frndName = e.target.value;
    })

    $("html").on("click", "button#remove", (e) => {
        $.ajax({
            url: "/friends/" + frndName,
            method: "DELETE",
            success: (data) => {
                listFriends();
            },
            fail: (err) => {
                display_error("Server Error please try again")
            }
        })
    })

    $("#btAddFriend").click((e)=>{
        //to close modal
        $('.modal').removeClass('in');
        var my_friend_list = [];
        $.ajax({
            url:"friends/list",
            success:(data)=>{
                data.forEach((obj) => {
                    my_friend_list[my_friend_list.length] = obj;
                })
                if(!my_friend_list.includes($("#newfriend").val())){
                    $.ajax({
                       url:"friends/"+$("#newfriend").val(),
                       method:"PUT",
                       success :(data) => {
                          display_error(data)
                           listFriends();
                       },
                      fail : (err) => {
                          display_error("Server Error please try again")
                      }

                    })
                }else{
                    console.log("eror")
                    display_error("friend Name Already Exists");
                }
            },
            fail:(err) => {
                console.log(err);
            }
        });

    })

})
