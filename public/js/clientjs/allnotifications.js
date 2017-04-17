var messageWithBtn = function(id, message){
    return `
            <div class="notification" id="${id}">
              <p class="text-lg">${message}<button class="btn btn-sm btn-primary pull-right">join</button</p>
            </div>
                    `;
};
var messageWithoutBtn = function(id, message){
    return `
            <div class="notification" id="${id}">
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
            $("#allnotifications").append(messageWithBtn(obj._id, obj.message));
          }
          else {
            $("#allnotifications").append(messageWithoutBtn(obj._id, obj.message));
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
})
