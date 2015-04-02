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
        'background' : 'rgba(221,209,180,1.0)',
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
        'background' : 'rgba(221,209,180,1.0)',
        'padding': 0,
        'margin': 0,
        'textAlign' : 'center',
        'fontFamily': '"Arial Black", Gadget, sans-serif',
        'overflowY': 'scroll',
        'borderTop': 'solid 1px rgba(33,33,33,1.0)',
        
        'listStyle' : 'none',
    },

    style_tile_list_row: {
        'height' : 120,
        'width' : '80%',
        // 'background' : 'rgba(255,255,255,1.0)',
        'padding': 0,
        'paddingLeft':'10%',
        'paddingRight':'10%',
        'margin': 0,
        'textAlign' : 'center',
        'fontFamily': '"Arial Black", Gadget, sans-serif',
        'overflow': 'none',
        'listStyle' : 'none',
        'fontSize':"1.0em",
    },

    style_tile_list_tile_left: {
        'height' : 130,
        'width' : 130,
        'background' : 'rgba(255,255,255,1.0)',
        'padding': 0,
        'margin': 0,
        'marginTop':20,
        'textAlign' : 'center',
        'fontFamily': '"Arial Black", Gadget, sans-serif',
        'overflow': 'none',
        'listStyle' : 'none',
        'float':'left',
        'borderRadius':10,

    },

    style_tile_list_tile_right: {
        'height' : 130,
        'width' : 130,
        'background' : 'rgba(255,255,255,1.0)',
        'padding': 0,
        'margin': 0,
        'marginTop':20,
        'textAlign' : 'center',
        'fontFamily': '"Arial Black", Gadget, sans-serif',
        'overflow': 'none',
        'listStyle' : 'none',
        'float':'right',
        'borderRadius':10,
    },

    style_tile_list_tile_left_disable: {
        'height' : 130,
        'width' : 130,
        'background' : 'rgba(100,100,100,1.0)',
        'padding': 0,
        'margin': 0,
        'marginTop':15,
        'textAlign' : 'center',
        'fontFamily': '"Arial Black", Gadget, sans-serif',
        'overflow': 'none',
        'listStyle' : 'none',
        'float':'left',
        'borderRadius':10,

    },

    style_tile_list_tile_right_disable: {
        'height' : 130,
        'width' : 130,
        'background' : 'rgba(100,100,100,1.0)',
        'padding': 0,
        'margin': 0,
        'marginTop':15,
        'textAlign' : 'center',
        'fontFamily': '"Arial Black", Gadget, sans-serif',
        'overflow': 'none',
        'listStyle' : 'none',
        'float':'right',
        'borderRadius':10,
    },
    style_tile_list_tile_title: {
        'width':'100%',
        'fontFamily': '"Arial Black", Gadget, sans-serif',
        'fontSize':12,
        'position':'relative',
        'float':'left',
        'marginTop':8,
    },

    style_tile_list_tile_icon: {
        'width':'100%',
        'fontFamily': 'FontAwesome',
        'fontSize':82,

        'position':'relative',
        'marginTop':12,
        'float':'left',
    
    },

    handle_Heatmap_TouchEnd: function(event) {
        // Request heatmap bounds
        
        Shell_Actions.loadHeatmapQuery(this.props.spatial_data);
    },
        
    render: function() {   
            
            return (<div style={this.style_base}>
                        <div style={this.style_tile_list}>
                            <ol style={this.style_tile_list_row} >
                                <li style={this.style_tile_list_tile_left} ><span style={this.style_tile_list_tile_title} >Sensor Layout</span><span style={this.style_tile_list_tile_icon} >&#xf00a;</span></li>
                                <li style={this.style_tile_list_tile_right} onTouchEnd={this.handle_Heatmap_TouchEnd}><span style={this.style_tile_list_tile_title} >Heatmap</span><span style={this.style_tile_list_tile_icon} ><img height="82" width="82" src="img/heat_map.png"></img></span></li>
                            </ol>

                            <ol style={this.style_tile_list_row} >
                                <li style={this.style_tile_list_tile_left} ><span style={this.style_tile_list_tile_title} >Sensor Stream</span><span style={this.style_tile_list_tile_icon} >&#xf1fe;</span></li>
                                <li style={this.style_tile_list_tile_right} onTouchEnd={this.handle_Heatmap_TouchEnd}><span style={this.style_tile_list_tile_title} >Raw Data</span><span style={this.style_tile_list_tile_icon} >&#xf0ce;</span></li>
                            </ol>

                        </div>
                    </div>);
    }
});