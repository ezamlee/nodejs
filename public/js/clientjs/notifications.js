var notificationType1 = function(id, message){
    return `

            <li id="${id}">
                <a>
                  <span class="text-success text-bold">${message}</span>
                  <span class="text-info text-bold"><u>Join</u></span>
                </a>
            </li>
                    `;
};
var notificationType2 = function(id, message){
    return `
            <li id="${id}">
                <a><span class="text-success text-bold">${message}</span></a>
            </li>
                    `;
};


var listAllNotifications = function(){
  $('#Notifications').html();
  $.ajax({
    url:"allnotifications/list",
    method:"",
    success:(data)=>{
      data.forEach((obj) => {
          if (obj.notifications[0].is_invited == false) {
            $("#Notifications").append(messageWithBtn(obj._id, obj.notifications[0].message));
          }
          else {
            $("#Notifications").append(messageWithoutBtn(obj._id, obj.notifications[0].message));
          }
      })
    },
    fail:(err)=>{
      console.log(err);
    }
  })
}


$(function(){
  listAllNotifications();
})
