/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var Reflux = require('reflux');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Debug = require('debug')('Header:View');

var Server_Actions = require('../../actions/server.action.js');
var Server_Store = require('../../stores/servers.store.js');

module.exports = React.createClass({
    mixins: [Reflux.ListenerMixin],


    getInitialState: function() {
        return {currentStatus: false};
    },



    onStatusChange: function(data) {
        if( data.server_id == this.props.server_id){
            this.setState({
                currentStatus: data.status
            });
        }
    },
    // componentDidMount: function() {
    //     this.listenTo(statusStore, this.onStatusChange);
    // },

    componentDidMount: function() {
        Debug("componentDidMount");

        // Move to own function for reuse

        var server_id = this.props.server_id;

        var ping = $.ajax({
            url: this.props.server_url,
        });

        ping.done(function( msg ) {
            Server_Actions.statusUpdate(server_id, true);

        });

        ping.fail(function( jqXHR, textStatus ) {
            Server_Actions.statusUpdate(server_id, false);
        });
        
        // $.ajax({
        //     async: true,
        //     url: this.props.server_url,
            
        //     success: function() { alert("afdasdf");  Server_Actions.statusUpdate(this.props.server_id, true)},     
        //     error: Server_Actions.statusUpdate(this.props.server_id, false),     
            
        //     // error: Server_Actions.statusUpdate('test', false),
        // }); 

        this.listenTo(Server_Store, this.onStatusChange);


        // Server_Store.listen(function(onlineUpdate) {
        //     alert(onlineUpdate);
            
           
        // });



        // var host = '8.8.8.8'


       

        // var ping = new PingPong({
        //     src: 'test',
        //     success: function() { alert('Server is online!'); },
        //     error: function() { alert('Server is dsfdsfline!'); },
        // });

        
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
        'paddingTop' : '4%',
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
        
    render: function() { 

        // alert(this.props.server_id + " : " + this.state.currentStatus);
        
        var style = this.style_base;

        // if(this.state.currentStatus == true) {
        //     style = this.style_online;
        // }

        // if(this.state.currentStatus == false) {
        //     style = this.style_offline;
        // }
        
        return (<li style={style}>

            <div style = {this.style_icon}>&#xf233;</div>
                
                Server State : 
                { this.state.currentStatus == true ? "Online" : "Offline"}                                          

            </li>);
    }
});