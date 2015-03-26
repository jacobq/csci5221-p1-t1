'use strict';

exports.socket = null;
exports.state = 'closed';
exports.server_url = null;
exports.stream_data = null;

// {
	
// 	ws: null,

// 	connect: function(url) {
// 		alert(url);

// 		var ws = new WebSocket("ws://" + url + "/ws");

// 		// ws.onopen = function() {
// 		// 	ws.send("Hello, world");
// 		// };


// 		// this.ws.onopen = function() {
// 			// this.ws.send("Hello, world");
// 		// },

// 		// ws.onmessage = function (evt) {
//    			// alert(evt.data);
// 		// },

// 	},

// 	send: function(msg) {

// 		this.ws.send(JSON.stringify({'test':'test'}));

// 	}

	
// };




// var ws = new WebSocket("ws://localhost:8888/websocket");
// 	ws.onopen = function() {
// 		ws.send("Hello, world");
// 	};
	
// 	ws.onmessage = function (evt) {
//    		alert(evt.data);
// 	};