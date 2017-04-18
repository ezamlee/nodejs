$(document).ready(() => {
	$.ajax({
		method:"get",
		url:"/api/email",
		success:(data)=>{
			socket.emit("identify",{"user":data})
		},
		fail:(err)=>{
			display_error("Server Error");
		}
	})

})