var dong = undefined;

var detail_temp = function(img,name,item,amount,price,comment,index,control){
	if(control)	
		return `<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12" style="margin:5px 0px">
	   		<div class="order">
	            <img src="img/profile/${img}" style="border-radius:50%">
	            <h4 style="color:#5aba8a">${name}</h4>
	            <h3>${item}</h3>
	            <h5>Amount: ${amount}</h5>
	            <h5>Price: ${price}</h5>
	            <h5>Comment: ${comment}</h5>
	            <div class="ftr">
		            <button class="btdel btn btn-mint btn-icon btn-circle icon-lg fa fa-times" value=${index}></button>
		        </div>
	        </div>
	    </div>`
    else
    	return `<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12" style="margin:5px 0px">
	   		<div class="order">
	            <img src="img//profile/${img}" style="border-radius:50%">
	            <h4 style="color:#5aba8a">${name}</h4>
	            <h3>${item}</h3>
	            <h5>Amount: ${amount}</h5>
	            <h5>Price: ${price}</h5>
	            <h5>Comment: ${comment}</h5>
	            <div style="height:7vh"></div>
	        </div>
	    </div>`
}

var load= function(){
	$.ajax({
		url:"/details/list/"+orderid,
		method:'GET',
		success:(data)=>{
			$("#details").html("");
			console.log(data)
			if((data[1]) == data[0].owner ){
				dong = data[0]
				$("#btfinish").remove();
				$("#btcancel").remove();
				$("#btrecept").remove();
				$("#page-title").append(
					`<button class="btn btn-success btn-labeled" id="btfinish" style="padding:5px 20px;float:right;margin:0px 5px" > Finish </button>
			         <button class="btn btn-danger btn-labeled" id="btcancel"  style="padding:5px 20px;float:right"> Cancel </button>
			         <button class="btn btn-default btn-labeled" id="btrecept"  style="padding:5px 20px;float:right"> view current total </button>

				`)
			}
			if (data[0].status != "ongoing"){
				$("#modaladd").remove();
				$("#btfinish").remove();
				$("#btcancel").remove();

			}
			var i = 0;
			data[0].order_detail.forEach((obj)=>{
				$.ajax({
					url:"/api/user/"+obj._id,
					method:"GET",
					success:(user)=>{
						user =user[0]
						if( data[1] == obj._id && data[0].status == "ongoing")
							$("#details").append(detail_temp(user.img,user.name,obj.item,obj.amount,obj.price,obj.comment,i++,true));
						else{
							$("#details").append(detail_temp(user.img,user.name,obj.item,obj.amount,obj.price,obj.comment,i++,false));
						}
					},
					fail:(err)=>{
						display_error("Internal server Error")
					}
				})
			})
		},
		fail:(err)=>{
			display_error("Server Internal Error Please try again later");
		}
	})
} 

$(document).ready(()=>{
	load();
	socket.on("detail_update",(data)=>{
		if(data.update){
			load();
		}
	})
	socket.emit("detail_room",{detail:""+orderid+""})	
	$("html").on("click",".btdel" , (ev)=>{
		var index = ev.target.value;
		if(dong){
			var order_detail = dong.order_detail;
			order_detail.splice(index,1);
			$.ajax({
				url:"/details/update/"+orderid,
				method:"DELETE",
				data :{"order":order_detail},
				success:(data)=>{
					if(data != "updated" ){
						display_error("This Order is already Closed")
						$(".btdel").remove();
					}
					socket.emit("detail_update",{detail:""+orderid+"","update":true});
				},
				fail: (err)=>{
					display_error("Server Internal Error");
				}
			})
		}
		else{
			display_error("You Cannot do any changes to this order")
			$(".btdel").remove();
		}
	})
	$("html").on("click","#btadd" , (ev)=>{
		$("#item").val()
		$("#amount").val()
		$("#price").val()
		$("#comment").val()

		$.ajax({
			url:"/details/update/"+orderid,
			method:"put",
			data:{"_id":"","name":"","item":$("#item").val(),"amount":$("#amount").val(),"price":$("#price").val(),"comment":$("#comment").val()},
			success :(data)=>{
				if(data == "updated")
				{
					display_error(data);
					socket.emit("detail_update",{detail:""+orderid+"","update":true});
					
				}else{
					display_error(data);
				}
			},
			fail:(err)=>{
				display_error("Internal server error")
			}
		})
	})
	$("html").on("click","#btfinish" , (ev)=>{
		$.ajax({
			url:"details/finish/"+orderid,
			method:"post",
			success:(data)=>{
				if(data == "finished"){
					display_error("Order finished successfuly");
					$("#btfinish").remove();
					$("#btcancel").remove();
					socket.emit("detail_update",{detail:""+orderid+"","update":true});					
				}else{
					display_error("you are not allowed to finish this order");
				}
			},
			fail:(err)=>{
				display_error("Internal server error");
			}
		})		
	})
	$("html").on("click","#btcancel" , (ev)=>{
		$.ajax({
			url:"details/cancel/"+orderid,
			method:"DELETE",
			success:(data)=>{
				if(data == "canceled"){
					display_error("Order canceled successfuly");
					socket.emit("detail_update",{detail:""+orderid+"","update":true});
					window.location.href = "http://localhost:8090/order";
				}else{
					display_error("you are not allowed to cancel this order");
				}
			},
			fail:(err)=>{
				display_error("Internal server error");
			}
		})
	})
	$("html").on("click","#btmenu" , (ev)=>{
		$.ajax({
			url:"details/menu/"+orderid,
			method:"get",
			success:(data)=>{
				$("#resmenu").attr("src","img/menu/"+data.menu)
			},
			fail:(err)=>{
				display_error("Internal server Error")
			}
		})
	})
	$("html").on("click","#btrecept",(ev)=>{
		$.ajax({
			url:"/details/list/"+orderid,
			method:'GET',
			success: (data)=>{
				var total = 0;
				var details = data[0].order_detail;
				details.forEach((item)=>{
					total+=item.amount * item.price;
				})
				display_error(`Your Current Total for Order is: ${total}`)
			},
			fail:(data)=>{

			}
		})
	})


})

