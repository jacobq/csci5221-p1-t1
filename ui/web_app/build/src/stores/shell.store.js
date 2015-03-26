var Reflux = require('reflux');

var Shell_Actions = require('../actions/shell.actions.js');

var Regions_Actions = require('../actions/regions.actions.js');

var WebSocket_Actions = require('../actions/websocket.actions.js');

var ws = require('../ws.js');

module.exports = Reflux.createStore({

    // Initial setup
    init: function() {

        this.listenTo(Shell_Actions.loadServers, this.loadServers);
        this.listenTo(Shell_Actions.loadRegions, this.loadRegions);
        this.listenTo(Shell_Actions.loadRegionDashboard, this.loadRegionDashboard);
        this.listenTo(Shell_Actions.loadHeatmapQuery, this.loadHeatmapQuery);

        this.listenTo(WebSocket_Actions.open, this.wsOnOpen);
        this.listenTo(WebSocket_Actions.close, this.wsOnClose);
        this.listenTo(WebSocket_Actions.message, this.wsOnMessage);

        this.listenTo(Shell_Actions.loadRegions_View, this.loadRegions_View);
    },

    connectWs: function(server_url) {
        // Check if socket is open
        if(ws.state == 'closed') {
            ws.server_url = server_url;

            ws.socket = new WebSocket("ws://" + ws.server_url + "/ws");

            ws.socket.onopen = function() { WebSocket_Actions.open() };
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

    wsOnClose: function() {
        ws.state = 'closed';
        ws.server_url = null;
    },

    wsOnMessage: function(evt) {
        msg = JSON.parse(evt.data);
        
        if(msg.message_type == "getRegionList_Response") {
            Regions_Actions.updateRegionList(msg.region_list);
            this.trigger({"msg_type" : "change_page", "msg" : "region_list"});
        }

        if(msg.message_type == "stream_data") {
            WebSocket_Actions.stream_data_recieve(msg)
        }
    },

    // Callback
    loadServers: function() {
        this.trigger({"msg_type" : "change_page", "msg" : "server_list"});
    },

    loadRegions: function(server_url) {
        if(ws.state == 'open') {
            if(ws.server_url == server_url) {
                // alert(ws.socket.readyState);
                this.trigger({"msg_type" : "change_page", "msg" : "region_list"});
            }

            else{
                ws.socket.close();
                this.connectWs(server_url);
            }
        }

        else{
            this.connectWs(server_url);
        }
        
    },

    loadRegionDashboard: function(region_id) {
        this.trigger({"msg_type" : "change_page", "msg" : "region_dashboard"});
    },

    loadHeatmapQuery: function() {
        this.trigger({"msg_type" : "change_page", "msg" : "heatmap_query"});
    },

    loadRegions_View: function() {
        this.trigger({"msg_type" : "change_page", "msg" : "region_list"});
    },
});