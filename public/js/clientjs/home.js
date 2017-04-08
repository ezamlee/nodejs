var activityBlock = function(ownerId, ownerImg, ownerName, activityStat){
    return `
              <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                <div class="activity">
                  <a href="" data-toggle="modal" data-target="#${ownerId}"><img src="img/${ownerImg}"></a>
                  <h4><a href="" class="text-primary text-thin" data-toggle="modal" data-target="#${ownerId}">${ownerName}</a></h4>
                  <h5>${activityStat}</h5>
                </div>
              </div>
                    `;
};
var latestOrder = function(id, meal, date){
    return `
              <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                <div class="latestOrder">
                  <h3><a href="/details/${id}" class="text-pink"><u>${meal}</u></a></h3>
                  <p>on</p>
                  <h4>${date}</h4>
                </div>
              </div>
                    `;
};
var activityList = function(){
    $.ajax({
        url:"home/activityList",
        success:(data)=>{

          data.forEach(function(obj){
            $.ajax({
                url:"/api/user/"+obj.owner,
                method:'get',
                success:(userData)=>{
                  $("#activities").append(activityBlock(obj._id, userData[0].img, userData[0].name, obj.meal));
                },
                fail:(err) => {
                    console.log(err);
                }
            });
          })

        },
        fail:(err) => {
            console.log(err);
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
            console.log(data);
        },
        fail:(err) => {
            console.log(err);
        }
    });
};

$(document).ready(() => {
    activityList();
    latestActivity();
})
