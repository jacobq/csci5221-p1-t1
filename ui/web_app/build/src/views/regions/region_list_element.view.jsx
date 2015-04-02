/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var Reflux = require('reflux');

var _ = require('underscore');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Debug = require('debug')('Header:View');

var Shell_Actions = require('../../actions/shell.actions.js');

var Server_Actions = require('../../actions/server.action.js');
var Server_Store = require('../../stores/servers.store.js');

var WebSocket_Actions = require('../../actions/websocket.actions.js');

var TWEEN = require('tween.js');

function animate( time ) {
    requestAnimationFrame( animate );
    TWEEN.update( time );
}

module.exports = React.createClass({
    mixins: [Reflux.ListenerMixin],

    getInitialState: function() {
        return {expanded: false, style_base: this.style_base, expanded_height: 200, region_state: null, sensor_count: null};
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
        'WebkitAnimationDuration': '1.0s',
        'animationDuration': '1.0s',
        'WebkitAnimationFillMode': 'both',
        'animationFillMode': 'both',
    },

    style_button_group: {
        'height':35,
        'width':'100%',
        
        
        'background' : 'rgba(255,25,255,1.0)',

        'margin':0,
        'padding':0,
        


    },

    style_button_edit: {
        'cursor':'default',
        'height':30,
        'width':'50%',
        'position': 'relative',
        'top':0,
        
        // 'background' : 'rgba(244,187,58,1.0)',
        'background' : 'rgba(100,100,100,1.0)',

        'float':'left',
        'margin':0,
        'padding':0,
        'paddingTop':5,
        'color': 'rgba(33,33,33,0.5)',


    },

    style_button_connect: {
        'cursor':'default',
        'height':30,
        'width':'50%',
        'position': 'relative',
        'top':0,
        'right':0,
        
        
        'background' : 'rgba(129,164,60,1.0)',
        'float':'right',
        'margin':0,
        'padding':0,
        'paddingTop':5,
        

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
        'height': '10%',
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

    style_fa_button: {
        'position':'relative',
        'fontFamily':'FontAwesome',
        'margin': 0,
        'padding': 0,
        'fontSize': '1.6em',

        'marginLeft': 5,
        'marginRight': 5,
        'top':'2px',
    },

    style_title: {

        
        'height': 37,
        'width': '100%',
        'margin': 0,
        'padding': 0,
        'paddingTop':8,
        'fontFamily': '"Arial Black", Gadget, sans-serif',
        'fontSize': '1.5em',
        // 'background' : 'rgba(2,25,250,1.0)',
    },

    style_info: {

        
        'height': 115,
        'width': '100%',
        'margin': 0,
        'padding': 0,
        'paddingTop':5,
        
        'fontFamily': '"Arial Black", Gadget, sans-serif',
        'fontSize': '1.5em',
        'background' : 'rgba(87,116,131,1.0)',
    },

    style_info_list: {

        
        'height': '100%',
        'width': '92%',
        'margin': 0,
        'padding': 0,

        'marginLeft':'4%',
        
        
        'fontFamily': '"Arial Black", Gadget, sans-serif',
        'fontSize': '0.65em',
        // 'background' : 'rgba(2,25,5,1.0)',
        'listStyle':'none',
        'display':'block',
        'float':'left',
    },

    style_info_list_item: {

        
        'height': 28,
        'width': '100%',
        'margin': 0,
        'padding': 0,
        
        // 'background' : 'rgba(255,25,5,1.0)',
        
        'display':'block',
    },

    style_info_list_item_title: {

        
        'height': 25,
        'margin': 0,
        'padding': 0,

        'float':'left',
    },

    style_info_list_item_data: {

        
        'height': 25,
        'margin': 0,
        'padding': 0,
        'marginLeft':5,
        
        'float':'left',
    },

    handle_Connect_TouchEnd: function(evt) {
        Shell_Actions.loadRegionDashboard(this.props.region_data.id, this.props.region_data.sensor_count, this.props.region_data.shape);
    },

    handle_Edit_TouchEnd: function(evt) {
        // Shell_Actions.loadEditServer("up",{"server_url" : this.props.server_data.server_url, 
        //                                     "server_port" : this.props.server_data.server_port, 
        //                                     "server_id" : this.props.server_data.server_id,
        //                                     "server_name" : this.props.server_data.server_name});
    },

    handleTouchEnd: function(event) {
        
        // Not Expanded
        if(this.state.expanded === false) { 
            this.setState({
                expanded: true,
            })
            
            var self = this;
            var tween = new TWEEN.Tween( { height : 45, })
                .to( { height : this.state.expanded_height }, 500 )
                .easing( TWEEN.Easing.Linear.None )
                .onUpdate( function () {
                    var updatedStyle = _.clone(self.state.style_base);
                    
                    updatedStyle.height = this.height;
                    
                    self.setState({
                        style_base: updatedStyle
                    });


                });

                tween.start();

                animate();
        }

        // Is Expanded
        else {
            this.setState({
                expanded: false,
            })
                var self = this;
                var tween = new TWEEN.Tween( { height : this.state.expanded_height })
                    .to( { height : 45 }, 500 )
                    .easing( TWEEN.Easing.Linear.None )
                    .onUpdate( function () {
                        
                        var updatedStyle = _.clone(self.state.style_base);

                        updatedStyle.height = this.height;

                        self.setState({
                            style_base: updatedStyle
                        });
                });

                tween.start();

                animate();
        }
    
        // Shell_Actions.loadRegionDashboard(this.props.region_data.id);
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

        return (<li style={this.state.style_base} onTouchEnd={this.handleTouchEnd}>

                    {this.props.region_data.shape.type == "polygon" ? <div style = {this.style_icon}>&#xf0c8;</div> : <div style = {this.style_icon}>&#xf111;</div>}
                    <div style={this.style_title}>{this.props.region_data.name}</div>

                    <ReactCSSTransitionGroup transitionName="example">                
                        {this.state.expanded === true ?
                            <div style={this.style_info}>
                                <ul style={this.style_info_list}>
                                    <li style={this.style_info_list_item}><div style={this.style_info_list_item_title}>Region Name:</div><div style={this.style_info_list_item_data}> {this.props.region_data.name}</div></li>
                                    <li style={this.style_info_list_item}><div style={this.style_info_list_item_title}>Region ID:</div><div style={this.style_info_list_item_data}> {this.props.region_data.id}</div></li>
                                    <li style={this.style_info_list_item}><div style={this.style_info_list_item_title}>Region Shape:</div><div style={this.style_info_list_item_data}> {this.props.region_data.shape.type}</div></li>
                                    <li style={this.style_info_list_item}><div style={this.style_info_list_item_title}>Sensor Count:</div><div style={this.style_info_list_item_data}> {this.props.region_data.sensor_count}</div></li>
                                </ul>
                        </div> : null } 
                    </ReactCSSTransitionGroup>     
                      
                    <ReactCSSTransitionGroup transitionName="example">
                        {this.state.expanded === true ?
                            <div style={this.style_button_group}>
                                <div onTouchEnd={this.handle_Edit_TouchEnd} style={this.style_button_edit}><span style={this.style_fa_button}>&#xf040;</span>Edit</div>
                                <div onTouchEnd={this.handle_Connect_TouchEnd} style={this.style_button_connect}>Connect<span style={this.style_fa_button}>&#xf045;</span></div>
                            </div> : null } 
                    </ReactCSSTransitionGroup>  
                </li>);
    }
});