var Reflux = require('reflux');

var Regions_Actions = require('../actions/regions.actions.js');

module.exports = Reflux.createStore({

    region_list: [],
    // Initial setup
    init: function() {
        this.listenTo(Regions_Actions.updateRegionList, this.updateRegionList);

        this.listenTo(Regions_Actions.requestRegionList, this.requestRegionList);
    },

    updateRegionList: function(region_list){
        this.region_list = region_list;

        this.trigger(this.region_list);
    },

    requestRegionList: function(){
        this.trigger(this.region_list);
    },
});