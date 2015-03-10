/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var Reflux = require('reflux');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Debug = require('debug')('Server_List:View');

var Server_List_Element_View = require('./server_list_element.view.jsx');

module.exports = React.createClass({
    
    componentDidMount: function() {
        Debug("componentDidMount");
    },

    componentWillUnmount: function() {
    },

    style_base: {
        'height' : '90%',
        'width' : '100%',
        'background' : 'rgba(100,100,100,1.0)',
        'position':'absolute',
        'top': 0,
        'left': 0,
        'padding': 0,
        'margin': 0,
        'textAlign' : 'center',
        'fontFamily': '"Arial Black", Gadget, sans-serif',
        'overflowY': 'scroll',
        'borderTop': 'solid 1px rgba(33,33,33,1.0)',
        'borderBottom': 'solid 1px rgba(33,33,33,1.0)',
        'listStyle' : 'none',
    },
        
    render: function() {            
            return (<ul style={this.style_base}>
                <Server_List_Element_View server_id = "test_1" server_url = 'http://localhost:8000/'/>
                <Server_List_Element_View server_id = "test_2" server_url = 'http://localh'/>


                </ul>);
    }
});