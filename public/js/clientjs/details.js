var dong;

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
			dong = data[0]
			if((data[1])){
				$("#page-title").append(
		`<button class="btn btn-success btn-labeled" id="btfinish" style="padding:5px 20px;float:right;margin:0px 5px" > Finish </button>
        <button class="btn btn-danger btn-labeled" id="btcancel"  style="padding:5px 20px;float:right"> Cancel </button>
					`)
			}
			$("#details").html("");
			var i = 0;
			data[0].order_detail.forEach((obj)=>{
				$.ajax({
					url:"/api/user/"+obj._id,
					method:"GET",
					success:(user)=>{
						user =user[0]
						if(obj._id == data[0].owner)
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
	socket.on("get",(data)=>{
		console.log(data);
		socket.emit("get" , {data : "data"});
	})
	load();

	$("html").on("click",".btdel" , (ev)=>{
		
	})

})

