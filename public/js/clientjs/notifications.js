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
var notificationsNumber = function(n){
    return `
            <span class="badge badge-header badge-danger">${n}</span>
                    `;
};


var listNotifications = function(){
  $.ajax({
    url:"notifications/list",
    method:"get",
    success:(data)=>{
      console.log(data);
      if (data.length > 0) {
        $("#Notifications").html("")
        data[0].notifications.forEach((obj) => {
            if (obj.is_invited == true) {
              $("#Notifications").append(notificationType1(obj._id, obj.message));
            }
            else {
              $("#Notifications").append(notificationType2(obj._id, obj.message));
            }
            $(".notify").append(notificationsNumber(data[0].notifications.length));
        })
      }
    },
    fail:(err)=>{
      display_error("server error");
    }
  })
}


var updateNotifications = function(){
  $.ajax({
    url:"notifications/update",
    method:"get",
    success:(data)=>{
      console.log(data);

    },
    fail:(data)=>{
      display_error("server error");
    }
  })
}

$(document).ready(()=>{
  listNotifications();
  socket.on("upNotify",(data)=>{
      listNotifications();
      console.log("updating");
  })
  $(".notify").on('click', function(){
    updateNotifications();
  })
})
