/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var Reflux = require('reflux');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Debug = require('debug')('Content:View');

var Shell_Actions = require('../actions/shell.actions.js');

var Content = React.createClass({
    mixins: [Reflux.ListenerMixin],

    getInitialState: function() {
        return {current_page: 'server_list', selected:null};
    },

    
    onStatusChange: function(data) {
        if(data.msg_type == "change_page") {
            this.setState({
                current_page: data.msg
            });
        }
    },

    componentDidMount: function() {
        Debug("componentDidMount");

        this.listenTo(Shell_Store, this.onStatusChange);

        // Server_Store.listen(function(status) {
        //     console.log('status: ', status);
        // });
    },

    componentWillUnmount: function() {
    },

    style_base: {
        'height' : '88%',
        'width' : '100%',
        'background' : 'rgba(255,25,255,1.0)',
        'position':'absolute',
        'top': '12%',
        'left': 0,
        'overflow':'hidden',
    },

    handleOnTouchEnd: function(evt){
        Shell_Actions.slideContentUp();
    },
        
    render: function() {  

        if(this.props.slideUp != null) {
            alert('null');
        }

        return (<div onClick={this.handleOnTouchEnd} style={this.style_base}></div>);


    }
});

module.exports = Content;