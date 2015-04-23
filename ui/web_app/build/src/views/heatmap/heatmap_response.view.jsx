/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var Reflux = require('reflux');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var Debug = require('debug')('Regions:View');
var WebSocket_Actions = require('../../actions/websocket.actions.js');
var Shell_Actions = require('../../actions/shell.actions.js');
var Submit_Heatmap_Button_View = require('./submit_heatmap_button.view.jsx');
var ws = require('../../ws.js');

module.exports = React.createClass({
    mixins: [Reflux.ListenerMixin],

    style_base: {
        'height' : '100%',
        'width' : '100%',
        'background' : 'rgba(255,255,255,1.0)',
        'position':'absolute',
        'top': 0,
        'left': 0,
    },

    style_group: {
        'width' : '96%',
        'background' : 'rgba(255,255,255,1.0)',
        'paddingLeft':'2%',
        'paddingRight':'2%',

        'margin':0,

        'marginTop':30,
        'float':'left',
    },

    style_select_left: {
        'float':'left',

    },

    style_select_right: {
        'float':'right',
    },

    style_select_null: {
        'display':'none',
    },

    button_style_base: {
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

    button_style_text: {
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

    button_style_fa: {
        'fontFamily':'FontAwesome',
        'margin': 0,
        'padding': 0,
        

        'marginLeft': 5,
        'marginRight': 5,

    },

    handleOn_Done_TouchEnd: function(evt){
        Shell_Actions.loadRegionDashboard_View('down');
    },


    render: function() {  
            return (<div style={this.style_base}>
                        <div onClick={this.handleOn_Done_TouchEnd} style={this.button_style_base}>
                            <span style={this.button_style_text}>Done</span>
                        </div>
                        <video style={this.style_group} src={this.props.page_data.heatmap_url} width="320" height="240" controls>
                        </video>
                </div>);
    }
});