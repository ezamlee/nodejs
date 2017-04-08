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
var activityList = function(){
    $.ajax({
        url:"home/activityList",
        success:(data)=>{

          data.forEach(function(obj){
            console.log(obj.owner);
            $.ajax({
                url:"/api/user/"+obj.owner,
                method:'get',
                success:(userData)=>{
                  console.log(userData);
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
            // $("#activities").html("");
            // data.forEach(function(obj){
            //     console.log("obj = ",obj);
            // })
            console.log(data);
        },
        fail:(err) => {
            console.log(err);
        }
    });
};

$(document).ready(() => {
    activityList();

})
