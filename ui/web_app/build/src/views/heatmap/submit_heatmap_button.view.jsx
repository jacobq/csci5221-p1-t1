/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var Reflux = require('reflux');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Debug = require('debug')('Header:View');

var Shell_Actions = require('../../actions/shell.actions.js');

module.exports = React.createClass({
    
    componentDidMount: function() {
        Debug("componentDidMount");
    },

    componentWillUnmount: function() {
    },

    style_base: {
        'height' : '10%',
        'width' : '100%',
        // 'background' : 'rgba(204,203,49,1.0)',
        'background' : 'rgba(129,164,60,1.0)',
        // 'background' : 'rgba(100,100,100,1.0)',
        'position':'absolute',
        'bottom': 0,
        'left': 0,
        'borderTop' : 'solid 2px rgba(33,33,33,1.0)',
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
    },

    style_fa: {
        'fontFamily':'FontAwesome',
        'margin': 0,
        'padding': 0,
        

        'marginLeft': 5,
        'marginRight': 5,

    },

    handleOnTouchEnd: function(evt){
        // Future Feature
    },
        
        
    render: function() {            
            return (<div onClick={this.handleOnTouchEnd} style={this.style_base}>
                        <span style={this.style_text}>Submit Query<span style={this.style_fa}>&#xf055;</span></span>
                    </div>);
    }
});