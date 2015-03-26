/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var Reflux = require('reflux');

var chartjs = require('chart.js');

var LineChart = require("react-chartjs").Line;

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Debug = require('debug')('Server_List:View');

var ws = require('../../ws.js');

var WebSocket_Actions = require('../../actions/websocket.actions.js');

module.exports = React.createClass({
    mixins: [Reflux.ListenerMixin],

    getInitialState: function() {
        return {stream_data: [0,0,0,0,0,0,0,0,0,0], labels : ['','','','','','','','','',''], current_index: 0};
    },

    onStatusChange: function(data) {

        this.state.labels.shift();
        this.state.stream_data.shift();

        this.state.labels[9] = data.stream_data.time;
        this.state.stream_data[9] = data.stream_data.data;

        this.forceUpdate();
    },

    componentWillMount: function() {
        this.listenTo(WebSocket_Actions.stream_data_recieve, this.onStatusChange);
    },
    
    componentDidMount: function() {
        Debug("componentDidMount");

        ws.socket.send(JSON.stringify({'message_type':'startStreamingData', 'stream_data': 'moisture'}));
    },

    componentWillUnmount: function() {
        ws.socket.send(JSON.stringify({'message_type':'stopStreamingData'}));
    },

    style_base: {
        'height' : 260,
        'width' : '100%',
        'background' : 'rgba(255,255,255,1.0)',       
        'padding': 0,
        'margin': 0,
        'textAlign' : 'center',
        'fontFamily': '"Arial Black", Gadget, sans-serif',
        'borderTop': 'solid 1px rgba(33,33,33,1.0)',
        'borderBottom': 'solid 1px rgba(33,33,33,1.0)',
        'listStyle' : 'none',
    },
        
    render: function() {   


        var chartData = {
            labels: this.state.labels,
            datasets: [
                {
                    label: "My First dataset",
                    fillColor: "rgba(0,0,220,0.2)",
                    strokeColor: "rgba(0,0,220,1)",
                    pointColor: "rgba(0,0,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: this.state.stream_data,
                },
            ]
        };



        // chartData.labels = self.state.labels;

        var chartOptions = {

            ///Boolean - Whether grid lines are shown across the chart
            scaleShowGridLines : true,

            //String - Colour of the grid lines
            scaleGridLineColor : "rgba(0,0,0,0.05)",

            //Number - Width of the grid lines
            scaleGridLineWidth : 1,

            //Boolean - Whether to show horizontal lines (except X axis)
            scaleShowHorizontalLines: true,

            //Boolean - Whether to show vertical lines (except Y axis)
            scaleShowVerticalLines: true,

            //Boolean - Whether the line is curved between points
            bezierCurve : true,

            //Number - Tension of the bezier curve between points
            bezierCurveTension : 0.4,

            //Boolean - Whether to show a dot for each point
            pointDot : true,

            //Number - Radius of each point dot in pixels
            pointDotRadius : 4,

            //Number - Pixel width of point dot stroke
            pointDotStrokeWidth : 1,

            //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
            pointHitDetectionRadius : 20,

            //Boolean - Whether to show a stroke for datasets
            datasetStroke : true,

            //Number - Pixel width of dataset stroke
            datasetStrokeWidth : 2,

            //Boolean - Whether to fill the dataset with a colour
            datasetFill : true,

            //String - A legend template
            legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

        };

        return (<div style={this.style_base}><LineChart data={chartData} options={chartOptions} width="400px" height="250"/></div>);
    }
});