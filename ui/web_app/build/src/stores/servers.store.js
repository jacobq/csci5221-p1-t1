var Reflux = require('reflux');
var _ = require('underscore');

var Server_Actions = require('../actions/server.action.js');

module.exports = Reflux.createStore({

	test_server: [{'id' : 'server_1', 'name' : 'Server 1'}],

    servers: {'test_1' : {'online' : false}, 'test_2' : {'online' : false}},

    server_list: [],
    // Initial setup
    init: function() {

        this.listenTo(Server_Actions.register, this.register);
        this.listenTo(Server_Actions.edit, this.edit);
        this.listenTo(Server_Actions.request, this.request);

        // Register statusUpdate action
        this.listenTo(Server_Actions.statusUpdate, this.statusUpdate);


    },

    register: function(server_data){

        dne = true;
        // Check id exists
        this.server_list.map(function(server) {
            if(server.server_id == server_data.server_id){
                dne = false;
            }
        })
        
        if(dne){
            server_data.online = false;

            this.server_list.push(server_data);
        }

        this.trigger(this.server_list);
    },

    request: function(){



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
    },

    edit: function(server_data, new_server_data) {

        // alert(this.server_list.length);

        // this.server_list = _.without(this.server_list, _.findWhere(this.server_list, {server_id: server_data.server_id}));

        // alert(this.server_list.length);
    
        for(x in this.server_list) {
            if(this.server_list[x].server_id === server_data.server_id){
                    new_server_data.online = false;

                    this.server_list[x] = new_server_data;

                    break;
                }
            }
    
        this.trigger(this.server_list);
 
    }
});