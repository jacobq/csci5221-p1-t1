var Reflux = require('reflux');

var Store = Reflux.createStore({

	test_server: [{'id' : 'server_1', 'name' : 'Server 1'}],
    // Initial setup
    init: function() {

        // Register statusUpdate action
        this.listenTo(statusUpdate, this.output);
    },

    // Callback
    output: function(flag) {
        var status = flag ? 'ONLINE' : 'OFFLINE';

        // Pass on to listeners
        this.trigger(status);
    }


});

module.exports = Store;