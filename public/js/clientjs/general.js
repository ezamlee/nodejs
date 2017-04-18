var display_error = function (mir) {
    var errmsg = `
    <div id="shade" style="background-color: rgba(0, 0, 0, 0.2); width: 100%; height: 100vh; position: absolute; z-index: 9999999999; display: block;">
    <div style="height:25vh"></div>
    <div id="contianer" style="background-color:rgba(255,255,255,1);width:70%;height:25vh;margin:0 auto">
        <button class="btn btn-info" style="float:right" onclick="document.getElementById('shade').style.display='none'">Close</button>

        <p style="height:10vh"></p>
        <p style="margin:0 auto;text-align:center"> ${mir} </p>
    </div>
</div>
`
    $("#krp").html(errmsg);
}

var update_all =function( array_of_users){
	socket.emit("notify",{"users":array_of_users})
}
