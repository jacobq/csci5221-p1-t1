/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var Reflux = require('reflux');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Debug = require('debug')('Header:View');

var ws = require('../ws.js');

var Shell_Actions = require('../actions/shell.actions.js');

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
        'zIndex':10,
        'overflow':'hidden',
    },

    style_icon_list: {
        'height' : '100%',
        'width' : '100%',
        'margin':0,
        'padding':0,
        
        'background' : 'rgba(255,255,255,1.0)',
        'listStyle':'none',

    },

    style_icon: {
        'cursor':'default',
        'height' : '100%',

        'margin':0,
        'padding':10,

        // 'marginLeft':10,

        // 'padding':10,
        
        'background' : 'rgba(255,255,255,1.0)',
        'fontFamily':'FontAwesome',
        'fontSize':42,
        'float':'left',

        'WebkitAnimationDuration': '0.8s',
        'animationDuration': '0.8s',
        'WebkitAnimationFillMode': 'both',
        'animationFillMode': 'both',

    },

    handle_Server_TouchEnd: function(evt){
        Shell_Actions.loadServers("right");
    },

    handle_Regions_TouchEnd: function(evt){
        Shell_Actions.loadRegions_View("right");
    },
        
    render: function() {   
            // Determine which to show

            // server_selected
            // region_selected

            var server_show = true;
            var regions_show = false;
            var region_show = false;

            if(this.props.selected == 'server_selected') {
                regions_show = true;
            }

            if(this.props.selected == 'region_selected') {
                regions_show = true;
                region_show = true;
            }

            return (<div style={this.style_base}>
                        <ol style={this.style_icon_list}>

                            <ReactCSSTransitionGroup transitionName="example">
                                { server_show ? <li onTouchEnd={this.handle_Server_TouchEnd} style={this.style_icon}>&#xf233;</li> : null}
                            </ReactCSSTransitionGroup>  

                            <ReactCSSTransitionGroup transitionName="example">
                                { regions_show ? <li onTouchEnd={this.handle_Regions_TouchEnd} style={this.style_icon}>&#xf009;</li> : null}
                            </ReactCSSTransitionGroup> 

                            <ReactCSSTransitionGroup transitionName="example">
                                { region_show ? <li onTouchEnd={this.handle_Region_TouchEnd} style={this.style_icon}>&#xf0c8;</li> : null }
                            </ReactCSSTransitionGroup> 
                           
                        </ol>
                    </div>);
            
    }
});