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
      data.forEach((obj) => {
          if (obj.notifications[0].is_invited == false) {
            $("#allnotifications").append(messageWithBtn(obj._id, obj.notifications[0].message));
          }
          else {
            $("#allnotifications").append(messageWithoutBtn(obj._id, obj.notifications[0].message));
          }
      })
    },
    fail:(err)=>{
      display_error("server error");
    }
  })
}


$(function(){
  listAllNotifications();
})
