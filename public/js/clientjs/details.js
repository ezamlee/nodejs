var detail_temp = function(img,name,item,amount,price,comment){
	return `<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
   		<div class="order">
            <img src="img/${img}" style="border-radius:50%">
            <h4 style="color:#5aba8a">${name}</h4>
            <h3>${item}</h3>
            <h5>Amount: ${amount}</h5>
            <h5>Price: ${price}</h5>
            <h5>Comment: ${comment}</h5>
        </div>
    </div>`
}

var load= function(id){
	$.ajax({
		url:"/details/list/"+id,
		method:'GET',
		success:(data)=>{
			console.log(data);
		},
		fail:(err)=>{
			display_error("Server Internal Error Please try again later");
		}
	})
} 

$(document).ready(()=>{
	load(orderid)
})

socket.on("get",(data)=>{
	console.log(data);
})