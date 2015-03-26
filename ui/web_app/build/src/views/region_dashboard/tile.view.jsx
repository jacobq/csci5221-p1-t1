/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var Reflux = require('reflux');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Debug = require('debug')('Server_List:View');

var ws = require('../../ws.js');

var Shell_Actions = require('../../actions/shell.actions.js');

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
        'padding': 0,
        'margin': 0,
        'textAlign' : 'center',
        'fontFamily': '"Arial Black", Gadget, sans-serif',
        'overflowY': 'scroll',
        'borderTop': 'solid 1px rgba(33,33,33,1.0)',
        'borderBottom': 'solid 1px rgba(33,33,33,1.0)',
        'listStyle' : 'none',
    },

    style_tile_list: {
        'width' : '100%',
        'background' : 'rgba(255,255,255,1.0)',
        'padding': 0,
        'margin': 0,
        'textAlign' : 'center',
        'fontFamily': '"Arial Black", Gadget, sans-serif',
        'overflowY': 'scroll',
        'borderTop': 'solid 1px rgba(33,33,33,1.0)',
        'borderBottom': 'solid 1px rgba(33,33,33,1.0)',
        'listStyle' : 'none',
    },

    style_tile_list_row: {
        'height' : 120,
        'width' : '80%',
        'background' : 'rgba(255,255,255,1.0)',
        'padding': 0,
        'paddingLeft':'10%',
        'paddingRight':'10%',
        'margin': 0,
        'textAlign' : 'center',
        'fontFamily': '"Arial Black", Gadget, sans-serif',
        'overflow': 'none',
        'listStyle' : 'none',
    },

    style_tile_list_tile_left: {
        'height' : 110,
        'width' : 110,
        'background' : 'rgba(0,0,255,1.0)',
        'padding': 0,
        'margin': 0,
        'marginTop':5,
        'textAlign' : 'center',
        'fontFamily': '"Arial Black", Gadget, sans-serif',
        'overflow': 'none',
        'listStyle' : 'none',
        'float':'left',
    },

    style_tile_list_tile_right: {
        'height' : 110,
        'width' : 110,
        'background' : 'rgba(0,0,255,1.0)',
        'padding': 0,
        'margin': 0,
        'marginTop':5,
        'textAlign' : 'center',
        'fontFamily': '"Arial Black", Gadget, sans-serif',
        'overflow': 'none',
        'listStyle' : 'none',
        'float':'right',
    },

    style_tile_list_tile_icon: {
        'fontFamily': 'FontAwesome',
        'fontSize':72,
    
    },

    handle_Heatmap_TouchEnd: function(event) {
        // Request heatmap bounds
        
        Shell_Actions.loadHeatmapQuery();
    },
        
    render: function() {      
            return (<div style={this.style_base}>
                        <div style={this.style_tile_list}>
                            <ol style={this.style_tile_list_row} >
                                <li style={this.style_tile_list_tile_left} >Sensor Data <span style={this.style_tile_list_tile_icon} >&#xf1fe;</span></li>
                                <li style={this.style_tile_list_tile_right} onTouchEnd={this.handle_Heatmap_TouchEnd}>Heatmap</li>
                            </ol>

                        </div>
                    </div>);
    }
});