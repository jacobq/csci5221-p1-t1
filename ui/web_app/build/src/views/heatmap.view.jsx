/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var Reflux = require('reflux');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Debug = require('debug')('Shell:View');

var Shell_Store = require('../stores/shell.store.js');

var Heatmap_Query_View = require('./heatmap/heatmap_query.view.jsx');
var Heatmap_Processing_View = require('./heatmap/heatmap_processing.view.jsx');
var Heatmap_Response_View = require('./heatmap/heatmap_response.view.jsx');

var WebSocket_Actions = require('../actions/websocket.actions.js');

var Heatmap = React.createClass({
    mixins: [Reflux.ListenerMixin],

    getInitialState: function() {
        return {current_page: 'heatmap_query', slide_dir: 'left', v_slide_state: 'down', slide:"left", 'page_data': null};
    },
    
    onStatusChange: function(data) {
        if(data.msg_type == "heatmap_change_page") {
            this.setState({
                slide_dir: data.msg.slide_dir,
                current_page: data.msg.page,
                page_data: data.msg.page_data
            });
        }
    },

    componentWillMount: function() {
        this.listenTo(Shell_Store, this.onStatusChange);
    },

    componentDidMount: function() {
        Debug("componentDidMount");
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
    },
        
    render: function() {  

        var trans = "slideHL";

        if(this.state.slide_dir == 'left'){
            trans = "slideHL";
        }

        if(this.state.slide_dir == 'right'){
            trans = "slideHR";
        }

        if(this.state.slide_dir === 'up'){
            trans = "slideVU";
        }

        if(this.state.slide_dir === 'down'){
            trans = "slideVD";
        }

        return (<div style={this.style_base}>
                    <ReactCSSTransitionGroup transitionName={trans}>
                        { this.state.current_page == 'heatmap_query' ? <Heatmap_Query_View page_data={this.props.page_data}/> : null }
                    </ReactCSSTransitionGroup>

                    <ReactCSSTransitionGroup transitionName={trans}>
                        { this.state.current_page == 'heatmap_processing' ? <Heatmap_Processing_View page_data={this.props.page_data}/> : null }
                    </ReactCSSTransitionGroup>

                    <ReactCSSTransitionGroup transitionName={trans}>
                        { this.state.current_page == 'heatmap_response' ? <Heatmap_Response_View page_data={this.props.page_data}/> : null }
                    </ReactCSSTransitionGroup>
                </div>);
    }
});

module.exports = Heatmap;
