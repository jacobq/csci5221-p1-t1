/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var Reflux = require('reflux');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Debug = require('debug')('Regions:View');

var WebSocket_Actions = require('../../actions/websocket.actions.js');

var ws = require('../../ws.js');

module.exports = React.createClass({
    mixins: [Reflux.ListenerMixin],

    getInitialState: function() {
        return { startDate: null,
                    startTime: null,
                    startTimes:[],
                    endDate: null,
                    endTime: null,
                    endTimes:[],
                    xMin: null,
                    xMax: null,
                    yMin: null,
                    yMax: null,
                    heatmap_bounds: {'date' : [], 'time': [], 'x':[], 'y': []}, 'start_date_entered' : false, 'end_date_entered' : false};
    },

    wsOnMessage: function(evt) {
        msg = JSON.parse(evt.data);
        
        if(msg.message_type == "heatmap_bounds_Response") {
            this.setState({
                heatmap_bounds: msg.heatmap_bounds
            });
        }
    },

    componentWillMount: function() {
        this.listenTo(WebSocket_Actions.message, this.wsOnMessage);
        
        // Need to get start/end dates and time lists
    },
    
    componentDidMount: function() {
        Debug("componentDidMount");

        ws.socket.send(JSON.stringify({'message_type':'heatmap_bounds', 'region_id' : 1}));

        // Need to get start/end dates and time lists
    },

    componentWillUnmount: function() {
    },

    style_base: {
        'height' : '88%',
        'width' : '100%',
        'background' : 'rgba(255,255,255,1.0)',
        'position':'absolute',
        'top': '12%',
        'left': 0,
    },

    style_group: {
        'width' : '96%',
        'background' : 'rgba(255,255,255,1.0)',
        'paddingLeft':'2%',
        'paddingRight':'2%',

        'margin':0,

        'marginTop':10,
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



    selectedStartDate: function(evt){
        this.setState({
                startDate: evt.target.value,
                startTimes: this.state.heatmap_bounds.time[evt.target.value]
            });
    },

    selectedStartTime: function(evt){
        this.setState({
                startTime: evt.target.value,
            });
    },

    selectedEndDate: function(evt){
        this.setState({
                endDate: evt.target.value,
                endTimes: this.state.heatmap_bounds.time[evt.target.value]
            });
    },

    selectedEndTime: function(evt){
        this.setState({
                endTime: evt.target.value,
            });
    },

    selected_xMin: function(evt){
        this.setState({
                xMin: evt.target.value,
            });
    },
    selected_xMax: function(evt){
        this.setState({
                xMax: evt.target.value,
            });
    },
    selected_yMin: function(evt){
        this.setState({
                yMin: evt.target.value,
            });
    },
    selected_yMax: function(evt){
        this.setState({
                yMax: evt.target.value,
            });
    },

    render: function() {            
            return (<div style={this.style_base}>
                        <div style={this.style_group}>
                            <select onChange={this.selectedStartDate} style={this.style_select_left} className="styled-select slate">
                                {this.state.startDate != null ? <option style={this.style_select_null} selected="selected">{this.state.startDate}</option> : <option selected="selected">Start Date</option>}
                                {this.state.heatmap_bounds.date.map(function(data) {
                                    return <option value={data} >{data}</option>
                                })}
                            </select>

                            <select onChange={this.selectedStartTime} style={this.style_select_right} className="styled-select slate">
                                {this.state.startTime != null ? <option style={this.style_select_null} selected="selected">{this.state.startTime}</option> : <option selected="selected">Start Time</option>}
                                {this.state.startTimes.map(function(data) {
                                    return <option value={data} >{data}</option>
                                })}
                            </select>
                        </div>


                        <div style={this.style_group}>
                            <select onChange={this.selectedEndDate} style={this.style_select_left} className="styled-select slate">
                                {this.state.endDate != null ? <option style={this.style_select_null} selected="selected">{this.state.endDate}</option> : <option selected="selected">End Date</option>}
                                {this.state.heatmap_bounds.date.map(function(data) {
                                    return <option>{data}</option>;
                                })}
                            </select>

                            <select style={this.style_select_right} className="styled-select slate">
                                {this.state.endTime != null ? <option style={this.style_select_null} selected="selected">{this.state.endTime}</option> : <option selected="selected">End Time</option>}
                                {this.state.endTimes.map(function(data) {
                                    return <option value={data} >{data}</option>
                                })}
                            </select>
                        </div>

                        <div style={this.style_group}>
                            <select onChange={this.selected_xMin} style={this.style_select_left} className="styled-select slate">
                                {this.state.xMin != null ? <option style={this.style_select_null} selected="selected">{this.state.xMin}</option> : <option selected="selected">Min X</option>}
                                {this.state.heatmap_bounds.x.map(function(data) {
                                    return <option value={data} >{data}</option>
                                })}
                            </select>

                            <select onChange={this.selected_xMax} style={this.style_select_right} className="styled-select slate">
                                {this.state.xMax != null ? <option style={this.style_select_null} selected="selected">{this.state.xMax}</option> : <option selected="selected">Max X</option>}
                                {this.state.heatmap_bounds.x.map(function(data) {
                                    return <option value={data} >{data}</option>
                                })}
                            </select>
                        </div>

                        <div style={this.style_group}>
                            <select onChange={this.selected_yMin} style={this.style_select_left} className="styled-select slate">
                                {this.state.yMin != null ? <option style={this.style_select_null} selected="selected">{this.state.yMax}</option> : <option selected="selected">Min Y</option>}
                                {this.state.heatmap_bounds.y.map(function(data) {
                                    return <option value={data} >{data}</option>
                                })}
                            </select>

                            <select onChange={this.selected_yMax} style={this.style_select_right} className="styled-select slate">
                                {this.state.yMax != null ? <option style={this.style_select_null} selected="selected">{this.state.yMax}</option> : <option selected="selected">Max Y</option>}
                                {this.state.heatmap_bounds.y.map(function(data) {
                                    return <option value={data} >{data}</option>
                                })}
                            </select>
                        </div>
                </div>);

    }
});