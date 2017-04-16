$(document).ready(() => {

    socket.on('get', function (data) {
	    console.log(data);
	    socket.emit("my other t event", { my: 'data' });
	});
	socket.on('post', function (data) {
	    console.log(data);
	    socket.emit("my other event", { my: 'data' });
	});
	socket.on('delete', function (data) {
	    console.log(data);
	    socket.emit("my other event", { my: 'data' });
	});
	socket.on('put', function (data) {
	    console.log(data);
	    socket.emit("my other event", { my: 'data' });
	});
})