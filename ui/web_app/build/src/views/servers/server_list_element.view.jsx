/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var Reflux = require('reflux');

var TWEEN = require('tween.js');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Debug = require('debug')('Header:View');

var Shell_Actions = require('../../actions/shell.actions.js');

var Server_Actions = require('../../actions/server.action.js');
var Server_Store = require('../../stores/servers.store.js');

var WebSocket_Actions = require('../../actions/websocket.actions.js');

function animate( time ) {
    requestAnimationFrame( animate );
    TWEEN.update( time );
}

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
        return {currentStatus: false, expanded: false, style_base: this.style_base};
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
        'height':30,
        'width':'100%',
        
        
        'background' : 'rgba(255,25,255,1.0)',

        'margin':0,
        'padding':0,
        'marginTop':35,


    },

    style_button_edit: {
        'cursor':'default',
        'height':30,
        'width':'50%',
        'position': 'relative',
        'top':0,
        
        'background' : 'rgba(255,25,0,1.0)',
        'float':'left',
        'margin':0,
        'padding':0,


    },

    style_button_connect: {
        'cursor':'default',
        'height':30,
        'width':'50%',
        'position': 'relative',
        'top':0,
        'right':0,
        
        
        'background' : 'rgba(2,25,250,1.0)',
        'float':'right',
        'margin':0,
        'padding':0,
        

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

    handleTouchEnd: function(event) {
        // Not Expanded
        if(this.state.expanded === false) { 
            this.setState({
                expanded: true,
            })
                var test = this;
                var tween = new TWEEN.Tween( { height : 45, 
                                                  
                                                } )
                        .to( { height : 95 }, 500 )
                        .easing( TWEEN.Easing.Linear.None )
                        .onUpdate( function () {



                            

                            var updatedStyle = _.clone(test.state.style_base);

                            updatedStyle.height = this.height;




                                // updatedStyle.height = this.height;
                                // updatedStyle.width = this.width;
                                
                                // updatedStyle.marginLeft = this.marginLeft;
                                // updatedStyle.marginTop = this.marginTop;

                                // updatedStyle.paddingTop = this.paddingTop;

                                // updatedStyle.fontSize = this.fontSize;

                                test.setState({
                                    style_base: updatedStyle
                                });

                            // updatedStyle.color = 'rgba(' + Math.round(this.r) + ',' + Math.round(this.g) + ',' + Math.round(this.b) + ',' + 1.0 + ')';

                            
                } );

                tween.start();

                animate();
        }

        else{
            this.setState({
                expanded: false,
            })
                var test = this;
                var tween = new TWEEN.Tween( { height : 95, 
                                                  
                                                } )
                        .to( { height : 45 }, 500 )
                        .easing( TWEEN.Easing.Linear.None )
                        .onUpdate( function () {



                            

                            var updatedStyle = _.clone(test.state.style_base);

                            updatedStyle.height = this.height;




                                // updatedStyle.height = this.height;
                                // updatedStyle.width = this.width;
                                
                                // updatedStyle.marginLeft = this.marginLeft;
                                // updatedStyle.marginTop = this.marginTop;

                                // updatedStyle.paddingTop = this.paddingTop;

                                // updatedStyle.fontSize = this.fontSize;

                                test.setState({
                                    style_base: updatedStyle
                                });

                            // updatedStyle.color = 'rgba(' + Math.round(this.r) + ',' + Math.round(this.g) + ',' + Math.round(this.b) + ',' + 1.0 + ')';

                            
                } );

                tween.start();

                animate();

        }
        
        // Shell_Actions.loadRegions(this.props.server_data.server_url);
    },

    handle_Connect_TouchEnd: function(evt) {
        Shell_Actions.loadRegions(this.props.server_data.server_url);
    },
        
    render: function() { 

        // alert(this.props.server_id + " : " + this.state.currentStatus);
        
        var style = this.style_base;

        var className = null;

        // if(this.state.currentStatus == true) {
        //     style = this.style_online;
        // }

        // if(this.state.currentStatus == false) {
        //     style = this.style_offline;
        // }
    
        // if(this.state.expanded === true){
            
        // }



        console.log(this.state.style_base.height);
        
        return (<li style={this.state.style_base} onTouchEnd={this.handleTouchEnd}>

            <div style = {this.style_icon}>&#xf233;</div>


                
                {this.props.server_data.server_name} : 
                { this.props.server_data.online == true ? "Online" : "Offline"}  

            {this.state.expanded === true ? <div style={this.style_button_group}>
                <div style={this.style_button_edit}>Edit</div>
                <div onTouchEnd={this.handle_Connect_TouchEnd} style={this.style_button_connect}>Connect</div>
            </div> : null }               

            </li>);
    }
});