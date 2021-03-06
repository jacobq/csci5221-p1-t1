/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var Reflux = require('reflux');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Debug = require('debug')('Regions:View');

var Live_Data_View = require('./region_dashboard/live_data.view.jsx');
var Tile_View = require('./region_dashboard/tile.view.jsx');

module.exports = React.createClass({
    mixins: [Reflux.ListenerMixin],

    getInitialState: function() {
        return {region_list: []};
    },

    onStatusChange: function(data) {
        this.setState({
            region_list: data
        });
    },
    
    componentDidMount: function() {
    },

    componentWillUnmount: function() {
    },

    style_base: {
        'height' : '88%',
        'width' : '100%',
        'background' : 'rgba(221,209,180,1.0)',
        'position':'absolute',
        'top': '12%',
        'left': 0,
        'overflow':'scroll',
        'WebkitAnimationDuration': '1.0s',
        'animationDuration': '1.0s',
        'WebkitAnimationFillMode': 'both',
        'animationFillMode': 'both',
    },
        
    render: function() {
            return (<div style={this.style_base}>
                    <Live_Data_View region_id = {this.props.page_data.region_id} sensor_count={this.props.page_data.sensor_count}/>
                    <Tile_View spatial_data={this.props.page_data.spatial_data}/>
                </div>);

    }
});