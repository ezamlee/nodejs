function orderTemplate(id,meal,nInvited,nJoined, rest,status,user,owner){
 return `
	   <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12" style="margin:5px">
	        <div class="order">
	            <span href=""><h3>${meal}</h3></span>
	            <p>From</p>
	            <a   href="" data-toggle="modal" data-target="#invited"><h3 value=${id} class="menume">${rest}</h3></a>
	            <p value=${id} > <a value=${id} href="" data-target="#invited" data-toggle="modal" class="num invitedme"><span value=${id} >Invited Friends</span> ${nInvited} </a></p>
	            <p value=${id} > <a value=${id} href="" data-target="#invited" data-toggle="modal" class="num joinedme"><span  value=${id} >Joined Friends</span> ${nJoined}</a></p>
	            <div class="ftr">
	                <button class="viewme btn btn-mint btn-icon btn-circle icon-lg fa fa-eye" value=${id}></button>
	            </div>
	        </div>
	    </div>
    `
}
function person_template(img,name){
	return `<div class="item active text-center">
        <div class="col-xs-4">
            <img src="img/profile/${img}" class="img-responsive" style="margin:0 auto">
            <h4>${name}</h4>
    	</div>
    </div>`
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
				$("#modal-title").text("");
				$("#modal-title").text("The Menu");
				$("#modal-body").html("");
				$("#modal-body").append(`<img src="img/menu/${data.menu}" class="img-responsive">`)
			},
			fail:(err)=>{
				console.log(err);
			}
		})
	}).on("click",".viewme",(ev)=>{

		window.location.assign("/details?id="+$(ev.target).attr("value"))
	}).on("click",".invitedme",(ev)=>{
		modal_header = $("#modal-title")
		modal_body   = $("#modal-body")
		order_id     = $(ev.target).attr("value")
		console.log(order_id)
		modal_header.text("The Invited People Are: ");
		$.ajax({
			url:"order/invited/"+order_id,
			method:"get",
			success:(data)=>{
				console.log(data)
				data =data.users_invited;
				modal_body.html("")
				console.log(data)
				data.forEach((obj)=>{
					$.ajax({
						url:"/api/user/"+obj,
						method:"get",
						success:(data)=>{
							modal_body.append(person_template(data[0].img,data[0].name))
						},
						fail:(data)=>{
							console.log(err);
						}
					})
				})
			},
			fail :(err)=>{
				display_error(data);
			}
		})
	}).on("click",".joinedme",(ev)=>{
		modal_header = $("#modal-title")
		modal_body   = $("#modal-body")
		order_id     = $(ev.target).attr("value")

		modal_header.text("The Joined People Are: ");
		$.ajax({
			url:"order/joined/"+order_id,
			method:"get",
			success:(data)=>{
				data =data.users_joined;
				modal_body.html("")
				data.forEach((obj)=>{
					$.ajax({
						url:"/api/user/"+obj,
						method:"get",
						success:(data)=>{
							modal_body.append(person_template(data[0].img,data[0].name))
						},
						fail:(data)=>{
							console.log(err);
						}
					})
				})
			},
			fail :(err)=>{
				display_error(data);
			}
		})
	})
})