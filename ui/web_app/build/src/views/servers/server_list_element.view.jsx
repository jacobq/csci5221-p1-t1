/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var Reflux = require('reflux');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Debug = require('debug')('Header:View');

var Shell_Actions = require('../../actions/shell.actions.js');

var Server_Actions = require('../../actions/server.action.js');
var Server_Store = require('../../stores/servers.store.js');

var WebSocket_Actions = require('../../actions/websocket.actions.js');

module.exports = React.createClass({
    mixins: [Reflux.ListenerMixin],

    checkServer: function() {

        var server_id = this.props.server_data.server_id;

        var ping = $.ajax({
            url: 'http://' + this.props.server_data.server_url + "/heartbeat",
        });

        ping.done(function( msg ) {
            Server_Actions.statusUpdate(server_id, true);

        });

        ping.fail(function( jqXHR, textStatus ) {
            Server_Actions.statusUpdate(server_id, false);
        });
    },


    getInitialState: function() {
        return {currentStatus: false};
    },

    componentDidMount: function() {
        Debug("componentDidMount");

        // Move to own function for reuse
    },

    componentWillUnmount: function() {
    },

    style_base: {
        'overflow': 'hidden',
        'height' : 45,
        'width' : '100%',
        'background' : 'rgba(255,255,255,1.0)',
        'padding': 0,
        'margin': 0,
        'textAlign' : 'center',
        'fontFamily': '"Arial Black", Gadget, sans-serif',
        'borderTop': 'solid 1px rgba(33,33,33,1.0)',
        'borderBottom': 'solid 1px rgba(33,33,33,1.0)',
    },

    style_online: {
        'overflow': 'hidden',
        'height' : 45,
        'width' : '100%',
        // 'background' : 'rgba(0,255,0,1.0)',
        'padding': 0,
        'margin': 0,
        'textAlign' : 'center',
        'fontFamily': '"Arial Black", Gadget, sans-serif',
        'borderTop': 'solid 1px rgba(33,33,33,1.0)',
        'borderBottom': 'solid 1px rgba(33,33,33,1.0)',
    },

    style_offline: {
        'overflow': 'hidden',
        'height' : 45,
        'width' : '100%',
        // 'background' : 'rgba(255,0,0,1.0)',
        'padding': 0,
        'margin': 0,
        'textAlign' : 'center',
        'fontFamily': '"Arial Black", Gadget, sans-serif',
        'borderTop': 'solid 1px rgba(33,33,33,1.0)',
        'borderBottom': 'solid 1px rgba(33,33,33,1.0)',
    },

    style_icon: {

        'position': 'relative',
        'height': '100%',
        'width': '10%',
        'float': 'left',
        'margin': 0,
        'padding': 0,
        'paddingTop' : 10,
        'fontFamily':'FontAwesome',
        'fontSize': '2em',
    },

    style_fa: {
        'fontFamily':'FontAwesome',
        'margin': 0,
        'padding': 0,
        'fontSize': '2em',

        'marginLeft': 5,
        'marginRight': 5,
    },

    handleTouchEnd: function(event) {
        Shell_Actions.loadRegions(this.props.server_data.server_url);
    },
        
    render: function() { 

        // alert(this.props.server_id + " : " + this.state.currentStatus);
        
        var style = this.style_base;

        // if(this.state.currentStatus == true) {
        //     style = this.style_online;
        // }

        // if(this.state.currentStatus == false) {
        //     style = this.style_offline;
        // }
        
        return (<li style={style} onTouchEnd={this.handleTouchEnd}>

            <div style = {this.style_icon}>&#xf233;</div>
                
                {this.props.server_data.server_name} : 
                { this.props.server_data.online == true ? "Online" : "Offline"}                                          

            </li>);
    }
});