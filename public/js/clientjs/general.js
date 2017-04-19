var display_error = function (mir) {
    var errmsg = `
    <div id="shade" style="background-color: rgba(0, 0, 0, 0); width: 20%; height: 15vh; position: absolute; z-index: 9999999999;right:0">
    <div style="height:100%"></div>
    <div id="error" style="background-color:rgba(255,255,255,1);width:100%;height:25vh;">
        <script>
          setTimeout(function(){ $("#shade").css("display","none"); }, 3000);
        </script>
        <p style="height:10vh"></p>
        <p style="margin:0 auto;text-align:center"> ${mir} </p>
    </div>
</div>
`
var dataAlert = [{
    type : "info"
  },{
    type : "primary"
  },{
    type : "success"
  },{
    type : "warning"
  },{
    type : "danger"
  },{
    type : "mint"
  },{
    type : "purple"
  },{
    type : "pink"
  },{
    type : "dark"
  }
], autoClose = true

dataNum = nifty.randomInt(0,8);
contentHTML = mir;
$.niftyNoty({
  type: dataAlert[dataNum].type,
  container : 'page',
  html : contentHTML,
  timer : autoClose ? 10000 : 0
});


}

var update_all =function( array_of_users){
  console.log(array_of_users)
	socket.emit("notify",{"users":array_of_users})
}
