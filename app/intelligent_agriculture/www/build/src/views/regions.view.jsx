/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var Reflux = require('reflux');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Debug = require('debug')('Regions:View');

var Regions_Store = require('../stores/regions.store.js');
var Regions_Actions = require('../actions/regions.actions.js');

var Region_List_View = require('./regions/region_list.view.jsx');

module.exports = React.createClass({
    mixins: [Reflux.ListenerMixin],

    getInitialState: function() {
        return {region_list: []};
    },

    onStatusChange: function(data) {
        this.setState({
            region_list: data
        });
    },
    
    componentDidMount: function() {
        Debug("componentDidMount");

        this.listenTo(Regions_Store, this.onStatusChange);

        Regions_Actions.requestRegionList();
    },

    componentWillUnmount: function() {
    },

    style_base: {
        'height' : '88%',
        'width' : '100%',
        'background' : 'rgba(255,255,255,1.0)',
        'position':'absolute',
        'top': '12%',
        'left': 0,
    },
        
    render: function() {            
            return (<div style={this.style_base}><Region_List_View region_list={this.state.region_list} /></div>);

    }
});