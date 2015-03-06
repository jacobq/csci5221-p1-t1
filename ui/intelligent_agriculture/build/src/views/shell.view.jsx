/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var Reflux = require('reflux');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Debug = require('debug')('Shell:View');

var Servers_Store = require('../stores/servers.store.js');

// var Servers_Actions = require('../actions/server.action.js');

var Shell = React.createClass({
    mixins : [Reflux.connect(Servers_Store,"currentStatus")],
    
    componentDidMount: function() {
        Debug("componentDidMount");

        this.props.store.on('change', function(event){
            Debug("change event caught");
            this.forceUpdate();
        }.bind(this), this);
    },

    componentWillUnmount: function() {
        this.props.store.off(null, null, this);
    },

    style_base: {
        'height' : '100%',
        'width' : '100%',
        'background' : 'rgba(255,255,255,1.0)',
        'position':'absolute',
        'top': 0,
        'left': 0,
    },
        
    render: function() {            
            return (<div style={this.style_base}>Test</div>);


    }
});

module.exports = Shell;