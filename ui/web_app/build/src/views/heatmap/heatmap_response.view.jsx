/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var Reflux = require('reflux');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var moment = require('moment')

var Debug = require('debug')('Regions:View');

var WebSocket_Actions = require('../../actions/websocket.actions.js');

var Shell_Actions = require('../../actions/shell.actions.js');

var Submit_Heatmap_Button_View = require('./submit_heatmap_button.view.jsx');

var ws = require('../../ws.js');

module.exports = React.createClass({
    mixins: [Reflux.ListenerMixin],

    getInitialState: function() {

        // Build Time Selection
        var time_select = []

        var d = new Date();
        var current_hour = d.getHours();
        var x = 1;

        for(x = 1; x < 11; x++) {
            time_select.push(current_hour-x + ":30");
            time_select.push(current_hour-x + ":00");
        }

        var x_min = this.props.page_data.spatial_data.vertices[0].x;
        var y_min = this.props.page_data.spatial_data.vertices[0].y;

        var x_max = this.props.page_data.spatial_data.vertices[1].x;
        var y_max = this.props.page_data.spatial_data.vertices[1].y;

        var delta = 10;
        var x_delta = (x_max - x_min)/delta;
        var y_delta = (y_max - y_min)/delta;

        var x_array = []
        var y_array = []
        var i = 0;

        for(i = x_min; i <= x_max; i+=x_delta){
            x_array.push(i);
        }

        for(i = y_min; i <= y_max; i+=y_delta){
            y_array.push(i);
        }
        
        // alert(x_array);
        // alert(y_array);

        return { startDate: null,
                    startTime: null,
                    startTimes: time_select,
                    endDate: null,
                    endTime: null,
                    endTimes: time_select,
                    xMin: null,
                    xMax: null,
                    yMin: null,
                    yMax: null,
                    heatmap_bounds: {'date' : [], 'time': [], 'x': x_array, 'y': y_array}, 'start_date_entered' : false, 'end_date_entered' : false};
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

        // this.listenTo(WebSocket_Actions.message, this.wsOnMessage);
        
        // Need to get start/end dates and time lists
    },
    
    componentDidMount: function() {
        Debug("componentDidMount");

        // ws.socket.send(JSON.stringify({'message_type':'heatmap_bounds', 'region_id' : 1}));

        

        // Need to get start/end dates and time lists
    },

    componentWillUnmount: function() {
    },

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

    handleOn_Done_TouchEnd: function(evt){
        Shell_Actions.loadRegionDashboard_View('down');
    },


    render: function() {  
            return (<div style={this.style_base}>
                        <div onClick={this.handleOn_Done_TouchEnd} style={this.button_style_base}>
                            <span style={this.button_style_text}>Done</span>
                        </div>

                         <video style={this.style_group} src="https://csci5221.web-controllable.com/static/video/movie.mp4" width="320" height="240" controls>
                            
                        </video> 

                </div>);
    }
});