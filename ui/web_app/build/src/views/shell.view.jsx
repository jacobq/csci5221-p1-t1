/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var Reflux = require('reflux');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Debug = require('debug')('Shell:View');

var Header_View = require('./header.view.jsx');
var Server_View = require('./servers.view.jsx');

var Server_Actions = require('../actions/server.action.js');

var Server_Store = require('../stores/servers.store.js');

var Shell = React.createClass({
    
    componentDidMount: function() {
        Debug("componentDidMount");

        // Server_Store.listen(function(status) {
        //     console.log('status: ', status);
        // });
    },

    componentWillUnmount: function() {
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

            return (<div style={this.style_base}>
                <Header_View />

                <Server_View />

                </div>);


    }
});

module.exports = Shell;