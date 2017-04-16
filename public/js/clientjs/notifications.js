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
    url:"allnotifications/list",
    method:"get",
    success:(data)=>{
      console.log(data);
    //  if (data.length >= 1) {
        data.forEach((obj) => {
            console.log("n= ",data.length);
            if (obj.notifications[0].is_invited == false) {
              $("#Notifications").append(notificationType1(obj._id, obj.notifications[0].message));
            }
            else {
              $("#Notifications").append(notificationType2(obj._id, obj.notifications[0].message));
            }
            $(".notify").append(notificationsNumber(data.length));
        })
      //  }

    },
    fail:(err)=>{
      display_error("server error");
    }
  })
}


$(function(){
  listNotifications();
})
