var Reflux = require('reflux');

var Shell_Actions = require('../actions/shell.actions.js');

var Regions_Actions = require('../actions/regions.actions.js');

var WebSocket_Actions = require('../actions/websocket.actions.js');

var ws = require('../ws.js');

module.exports = Reflux.createStore({

    // Initial setup
    init: function() {

        this.listenTo(Shell_Actions.loadServers, this.loadServers);
        this.listenTo(Shell_Actions.loadAddServer, this.loadAddServer);
        this.listenTo(Shell_Actions.loadEditServer, this.loadEditServer);
        this.listenTo(Shell_Actions.loadRegions, this.loadRegions);
        this.listenTo(Shell_Actions.loadRegionDashboard, this.loadRegionDashboard);
        this.listenTo(Shell_Actions.loadHeatmapQuery, this.loadHeatmapQuery);

        this.listenTo(WebSocket_Actions.open, this.wsOnOpen);
        this.listenTo(WebSocket_Actions.error, this.wsOnError);
        this.listenTo(WebSocket_Actions.close, this.wsOnClose);
        this.listenTo(WebSocket_Actions.message, this.wsOnMessage);

        this.listenTo(Shell_Actions.loadRegions_View, this.loadRegions_View);
    },

    connectWs: function(server_url, server_port) {
        // Check if socket is open
        if(ws.state == 'closed') {
            ws.server_url = server_url;
            ws.server_port = server_port;

			if(server_port === null) {
				ws.socket = new WebSocket("ws://" + ws.server_url + "/ws");
			}
		
			else {
				ws.socket = new WebSocket("ws://" + ws.server_url + ":" + ws.server_port.toString() + "/ws");
			}
			            
            ws.socket.onopen = function() { WebSocket_Actions.open() };
            ws.socket.onerror = function() { WebSocket_Actions.error() };
            ws.socket.onclose = function(){ WebSocket_Actions.close() };
            ws.socket.onmessage = function(evt){ WebSocket_Actions.message(evt) };
        }

        // Change Server
        else if(ws.state == 'open' && ws.server_url != server_url) {
            ws.socket.close();
        }
    },

    wsOnOpen: function() {
        // Replace with client ident/mac and other bootstraping
        // authent
        
        ws.state = 'open';
    
        ws.socket.send(JSON.stringify({'message_type':'getRegionList'}));
    },


    wsOnError: function(ev) {
        // Replace with client ident/mac and other bootstraping
        // authent
        
        alert("error");
        //~ ws.state = 'error';
   
    },
    wsOnClose: function() {
        ws.state = 'closed';
        ws.server_url = null;
    },

    wsOnMessage: function(evt) {
        msg = JSON.parse(evt.data);
        
        if(msg.message_type == "getRegionList_Response") {
            Regions_Actions.updateRegionList(msg.region_list);
            this.trigger({"msg_type" : "change_page", "msg" : {"page" : "region_list", "slide_dir" : "left"}});
        }

        if(msg.message_type == "stream_data") {
            WebSocket_Actions.stream_data_recieve(msg)
        }
    },

    // Callback
    loadServers: function(trans) {
        this.trigger({"msg_type" : "change_page", "msg" : {"page" : "server_list", "slide_dir" : trans}});
    },

    loadAddServer: function(trans) {
        this.trigger({"msg_type" : "change_page", "msg" : {"page" : "add_server", "slide_dir" : trans}});
    },

    loadEditServer: function(trans, server_data) {
        this.trigger({"msg_type" : "change_page_edit", "msg" : {"page" : "edit_server", "slide_dir" : trans, "page_data": server_data}});
    },

    loadRegions: function(server_url, server_port) {
        if(ws.state == 'open') {
            if(ws.server_url == server_url) {
                // alert(ws.socket.readyState);
                this.trigger({"msg_type" : "change_page", "msg" : {"page" : "region_list", "slide_dir" : "left"}});
            }

            else{
                ws.socket.close();
                this.connectWs(server_url, server_port);
            }
        }

        else{
            this.connectWs(server_url, server_port);
        }
        
    },

    loadRegionDashboard: function(region_id, sensor_count, trans) {
        this.trigger({"msg_type" : "change_page", "msg" : {"page" : "region_dashboard", "slide_dir" : trans, "page_data": {'region_id' : region_id, 'sensor_count': sensor_count}}});
    },

    loadHeatmapQuery: function() {
        this.trigger({"msg_type" : "change_page", "msg" : {"page" : "heatmap_query", "slide_dir" : "left"}});
    },

    loadRegions_View: function(trans) {
        this.trigger({"msg_type" : "change_page", "msg" : {"page" : "region_list", "slide_dir" : trans}});
    },

    
});
