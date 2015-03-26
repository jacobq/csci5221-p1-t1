/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var Reflux = require('reflux');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Debug = require('debug')('Server:View');

var Server_List_View = require('./servers/server_list.view.jsx');
var Add_Server_Button_View = require('./servers/add_server_button.view.jsx');

var Servers_Store = require('../stores/servers.store.js');

module.exports = React.createClass({
    
    componentDidMount: function() {
        Debug("componentDidMount");
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
        'zIndex':0,
        'WebkitAnimationDuration': '1.0s',
        'animationDuration': '1.0s',
        'WebkitAnimationFillMode': 'both',
        'animationFillMode': 'both',
    },
        
    render: function() {            
            return (<div style={this.style_base}>
                <Server_List_View />
                <Add_Server_Button_View />

                </div>);


    }
});