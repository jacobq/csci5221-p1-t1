var Reflux = require('reflux');

var Server_Actions = require('../actions/server.action.js');

module.exports = Reflux.createStore({

	test_server: [{'id' : 'server_1', 'name' : 'Server 1'}],

    servers: {'test_1' : {'online' : false}, 'test_2' : {'online' : false}},

    server_list: [],
    // Initial setup
    init: function() {

        this.listenTo(Server_Actions.register, this.register);

        // Register statusUpdate action
        this.listenTo(Server_Actions.statusUpdate, this.statusUpdate);


    },

    register: function(server_data){
        server_data.online = false;

        this.server_list.push(server_data);

        this.trigger(this.server_list);
    },

    // Callback
    statusUpdate: function(server_id, flag) {
        
        this.server_list.map(function(server) {
            if(server.server_id == server_id){
                server.online = flag;
            }
        })

        this.trigger(this.server_list);

        // this.servers[server_id].online = flag;

        // Pass on to listeners
        // this.trigger({'server_id' : server_id, 'status' : this.servers[server_id].online});
    }
});