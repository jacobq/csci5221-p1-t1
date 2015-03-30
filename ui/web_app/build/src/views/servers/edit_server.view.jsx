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

module.exports = React.createClass({

    getInitialState: function() {
        return {server_name: null, server_id: null, server_url: null, server_port: null};
    },
    
    componentDidMount: function() {
        Debug("componentDidMount");
    },

    componentWillUnmount: function() {
    },

    style_base: {
        'height' : '88%',
        'width' : '100%',
        'background' : 'rgba(221,209,180,1.0)',
        'position':'absolute',
        'bottom': 0,
        'left': 0,
        'WebkitAnimationDuration': '1.0s',
        'animationDuration': '1.0s',
        'WebkitAnimationFillMode': 'both',
        'animationFillMode': 'both',
    },

    style_button_submit: {
        'height' : '10%',
        'width' : '100%',
        'background' : 'rgba(129,164,60,1.0)',
        'position':'absolute',
        'bottom': 0,
        'left': 0,
        'borderTop' : 'solid 2px rgba(33,33,33,1.0)',
        'cursor':'default',

    },

    style_button_cancel: {
        'height' : '10%',
        'width' : '100%',
        'background' : 'rgba(213,86,43,1.0)',
        'position':'absolute',
        'top': 0,
        'left': 0,
        'borderTop' : 'solid 2px rgba(33,33,33,1.0)',
        'cursor':'default',
    },

    style_text: {
        'height' : '75%',
        'width' : '100%',

        'position':'absolute',
        'bottom': 0,
        'left': 0,

        'margin': 0,
        'padding': 0,

        'marginTop': '25%',
  
        'textAlign' : 'center',
        'fontFamily': '"Arial Black", Gadget, sans-serif',
        'fontSize': '1.5em',

        'verticalAlign':'bottom',
        'cursor':'default',

        

    },

    style_fa: {
        'fontFamily':'FontAwesome',
        'margin': 0,
        'padding': 0,
        

        'marginLeft': 5,
        'marginRight': 5,
        'cursor':'default',
    },

    style_content: {
        'height' : '80%',
        'width' : '100%',
        
        'position':'absolute',
        'top': '10%',
        'left': 0,
        'borderTop' : 'solid 2px rgba(33,33,33,1.0)',
        'cursor':'default',
    },

    style_input: {
        'position':'relative',
        'height' : 45,
        'width' : '80%',

        'margin':0,
        'padding':0,

        'marginTop':30,
        
        'marginLeft':'9%',

        'textAlign':'center',

        'fontSize': '1.25em',
    },

    handle_Cancel_OnTouchEnd: function(evt){
        Shell_Actions.loadServers("down");
        
    },


    handle_Submit_OnTouchEnd: function(evt){
        if(this.state.server_id === null && this.state.server_name !== null) {
            Server_Actions.register({'server_id' : this.state.server_name, 'server_name' : this.state.server_name, 'server_url' : this.state.server_url + ":" + this.state.server_port})
        }

        else {
            Server_Actions.register({'server_id' : this.state.server_id, 'server_name' : this.state.server_name, 'server_url' : this.state.server_url + ":" + this.state.server_port})
        }
        
        Shell_Actions.loadServers("down");
        
    },

    handle_ServerName_Input: function(evt){
        this.setState({
            server_name: evt.target.value,
        });
    },

    handle_ServerID_Input: function(evt){
        this.setState({
            server_id: evt.target.value,
        });
    },

    handle_ServerURL_Input: function(evt){
        this.setState({
            server_url: evt.target.value,
        });
    },

    handle_ServerPort_Input: function(evt){
        this.setState({
            server_port: evt.target.value,
        });
    },
    
    render: function() {    
            return (<div style={this.style_base}>
                        <div onClick={this.handle_Cancel_OnTouchEnd} style={this.style_button_cancel}>
                            <span style={this.style_text}>Cancel<span style={this.style_fa}>&#xf057;</span></span>
                        </div>

                        <div style={this.style_content}>
                            <input onChange={this.handle_ServerName_Input} style={this.style_input} placeholder="Server Name" value={this.props.page_data.server_name}></input>
                            <input style={this.style_input} placeholder={this.state.server_name == null ? "Server ID" : this.state.server_name} value={this.props.page_data.server_id}></input>
                            <input style={this.style_input} placeholder="Server URL/IP Address" value={this.props.page_data.server_url}></input>
                            <input style={this.style_input} placeholder="Port" value={this.props.page_data.server_port}></input>
                        </div>
                        <div onClick={this.handle_Submit_OnTouchEnd} style={this.style_button_submit}>
                            <span style={this.style_text}>Save<span style={this.style_fa}>&#xf058;</span></span>
                        </div>
                    </div>);
    }
});