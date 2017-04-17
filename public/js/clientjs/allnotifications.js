var messageWithBtn = function(orderId, message){
    return `
            <div class="notification" id="${orderId}">
              <p class="text-lg">${message}<button class="btn btn-sm btn-primary pull-right join" value="${orderId}" >join</button</p>
            </div>
                    `;
};
var messageWithoutBtn = function(orderId, message){
    return `
            <div class="notification" id="${orderId}">
              <p class="text-lg">${message}</p>
            </div>
                    `;
};


var listAllNotifications = function(){
  $('#allnotifications').html();
  $.ajax({
    url:"allnotifications/list",
    method:"get",
    success:(data)=>{
      data[0].notifications.forEach((obj) => {
          if (obj.is_invited == true) {
            $("#allnotifications").append(messageWithBtn(obj.orderId, obj.message));
          }
          else {
            $("#allnotifications").append(messageWithoutBtn(obj.orderId, obj.message));
          }
      })
    },
    fail:(err)=>{
      display_error("server error");
    }
  })
}


$(document).ready(()=>{
    socket.on("upNotify",(data)=>{
      if(data.toUpdate){
        listAllNotifications();
      }
    })
    listAllNotifications();

    $("#allnotifications").on('click', ".join", function(e){

      var ordId = e.target.value;
      $.ajax({
        url:"allnotifications/updateOrder",
        method:"post",
        data:{'id':ordId},
        success:(data)=>{
          console.log(data);


        },
        fail:(err)=>{
          display_error("server error");
        }
      })

      e.target.disabled = true

    })

})
