
var socket = io.connect("http://localhost:3000");

var $input = document.querySelector('.input-message').value;

socket.on('connect', function() {
	console.log('conected!');
});