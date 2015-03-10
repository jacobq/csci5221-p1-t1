var Reflux = require('reflux');

var Server_Actions = require('../actions/server.action.js');

module.exports = Reflux.createStore({

	test_server: [{'id' : 'server_1', 'name' : 'Server 1'}],

    servers: {'test_1' : {'online' : false}, 'test_2' : {'online' : false}},
    // Initial setup
    init: function() {

        // Register statusUpdate action
        this.listenTo(Server_Actions.statusUpdate, this.statusUpdate);
    },

    // Callback
    statusUpdate: function(server_id, flag) {
        this.servers[server_id].online = flag;

        // Pass on to listeners
        this.trigger({'server_id' : server_id, 'status' : this.servers[server_id].online});
    }
});