/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var Reflux = require('reflux');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Debug = require('debug')('Header:View');

module.exports = React.createClass({
    
    componentDidMount: function() {
        Debug("componentDidMount");
    },

    componentWillUnmount: function() {
    },

    style_base: {
        'height' : '12%',
        'width' : '100%',
        'background' : 'rgba(25,255,255,1.0)',
        'position':'absolute',
        'top': 0,
        'left': 0,
    },
        
    render: function() {            
            return (<div style={this.style_base}></div>);


    }
});