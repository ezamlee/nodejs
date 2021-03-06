var activityBlock = function(ownerId, ownerImg, ownerName, restaurant_name, activityStat){
    return `
              <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                <div class="activity">
                  <a href="" data-toggle="modal" data-target="#${ownerId}"><img src="img/profile/${ownerImg}"></a>
                  <h4><a href="" class="text-primary text-thin" data-toggle="modal" data-target="#${ownerId}">${ownerName}</a></h4>
                  <h4>has created an order</h4>
                  <h6>from</h6>
                  <h4 class="text-pink"><u>${restaurant_name}</u></h4>
                  <h6>for</h6>
                  <h4 class="text-pink"><u>${activityStat}</u></h4>
                </div>
              </div>
                    `;
};
var friendModal = function(id, img, name, email){
    return `
            <div id="${id}" class="modal fade" role="dialog">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal">&times;</button>
                      <h4 class="modal-title">Modal Header</h4>
                    </div>
                    <div class="modal-body">
                      <div class="row">
                        <div class="col-xs-4 col-xs-offset-2">
                          <img src="img/profile/${img}">
                        </div>
                        <div class="col-xs-6">
                          <h4>${name}</h4>
                          <h4>${email}</h4>
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
            </div>
                    `;
};

var latestOrder = function(id, meal, date){
    var dt = new Date(date);
    var d = dt.getDate();
    var m = dt.getMonth() + 1;
    var y = dt.getFullYear();
    var newDate = d + '/' + m + '/' + y;
    return `
              <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                <div class="latestOrder">
                  <h3><a href="/details?id=${id}" class="text-pink"><u>${meal}</u></a></h3>
                  <p>on</p>
                  <h4>${newDate}</h4>
                </div>
              </div>
                    `;
};
var activityList = function(){
    $.ajax({
        url:"home/activityList",
        success:(data)=>{

          data.forEach(function(obj){
            //console.log(obj);
            $.ajax({
                url:"/api/user/"+obj.owner,
                method:'get',
                success:(userData)=>{
                  $("#activities").append(activityBlock(obj._id, userData[0].img, userData[0].name, obj.restaurant_name, obj.meal));
                  $(".boxed").append(friendModal(obj._id, userData[0].img, userData[0].name, userData[0]._id));
                },
                fail:(err) => {
                    display_error("server error");
                }
            });
          })

        },
        fail:(err) => {
            display_error("server error");
        }
    });
};

var latestActivity = function(){
    $.ajax({
        url:"home/latestActivity",
        success:(data)=>{
            // $("#latestOrders").html("");
            data.forEach(function(obj){
              $("#latestOrders").append(latestOrder(obj._id, obj.meal, obj.date));
            })
        },
        fail:(err) => {
            display_error("server error");
        }
    });
};

$(document).ready(() => {
    activityList();
    latestActivity();
})
