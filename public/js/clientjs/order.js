function orderTemplate(id,meal,nInvited,nJoined, rest,status,user,owner){
  var ret="";

  if(status = "ongoing" && owner == user ){
  	ret = `
	   <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
	        <div class="order">
	            <span href=""><h3>${meal}</h3></span>
	            <p>From</p>
	            <a   href="" data-toggle="modal" data-target="#view"><h3 value=${id} class="menume">${rest}</h3></a>
	            <p> <a value=${id} href="" data-target="#invited" data-toggle="modal" class="num invitedme"><span>Invited Friends</span> ${nInvited} </a></p>
	            <p> <a value=${id} href="" data-target="#joined" data-toggle="modal" class="num joinedme"><span>Joined Friends</span> ${nJoined}</a></p>
	            <div class="ftr">
	                <button class="viewme btn btn-mint btn-icon btn-circle icon-lg fa fa-eye" value=${id}></button>
	                <button class="finishme btn btn-warning btn-icon btn-circle icon-lg fa fa-stop finish" data-target="#finish" data-toggle="modal" value=${id}></button>
	                <button class="cancelme btn btn-danger btn-icon btn-circle icon-lg fa fa-times cancel" data-target="#cancel" data-toggle="modal" value=${id}></button>
	            </div>
	        </div>
	    </div>
    `
  }else{
  	ret = `
	   <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
	        <div class="order">
	            <a  href="" data-toggle="modal" data-target="#view"><h3 value=${id} class="menume">${rest}</h3></a>
	            <p>From</p>
	            <a class="menume"  href="" data-toggle="modal" data-target="#view"><h3 value=${id}>${rest}</h3></a>
	            <p> <a value=${id} href="" data-target="#invited" data-toggle="modal" class="num invitedme"><span>Invited Friends</span> ${nInvited} </a></p>
	            <p> <a value=${id} href="" data-target="#joined" data-toggle="modal" class="num joinedme"><span>Joined Friends</span> ${nJoined}</a></p>
	            <div class="ftr">
	                <button class="viewme btn btn-mint btn-icon btn-circle icon-lg fa fa-eye" data-target="#view" data-toggle="modal" value=${id}></button>
	            </div>
	        </div>
	    </div>
    `
  }
  return ret;
}
function list(){
		$.ajax({
			url:"/order/list",
			method:"get",
			success:(inp)=>{
				var user = inp.user;
				data = inp.data
				$("#orders").html("");
				inp.data.forEach((obj)=>{
					$("#orders").append(orderTemplate(obj._id,obj.meal,obj.users_invited.length,obj.users_joined.length,obj.restaurant_name,obj.status,user,obj.owner));					
				})
				data2 = inp.data
			},
			fail:(err)=>{
				console.log(err)
		}
	})
};
$(document).ready(()=>{
	list();
	$("html").on("click",".menume",(ev)=>{
		$.ajax({
			url:"/order/menu/"+$(ev.target).attr("value"),
			method:"get",
			success:(data)=>{
				$("#view").find(".img-responsive").attr("src","img/menu/"+data.menu)
			},
			fail:(err)=>{
				console.log(err);
			}
		})
	}).on("click",".viewme",(ev)=>{
		window.location.assign("/details?id="+$(ev.target).attr("value"))
	}).on("click",".cancel",(ev)=>{
		window.location.assign("/details?id="+$(ev.target).attr("value"))
	}).on("click",".finishme",(ev)=>{
		window.location.assign("/details?id="+$(ev.target).attr("value"))
	})
})