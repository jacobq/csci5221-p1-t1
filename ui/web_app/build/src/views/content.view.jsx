/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var Reflux = require('reflux');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Debug = require('debug')('Shell:View');

var Shell_Store = require('../stores/shell.store.js');

var Header_View = require('./header.view.jsx');

var Server_View = require('./servers.view.jsx');
var Region_View = require('./regions.view.jsx');
var Region_Dashboard_View = require('./region_dashboard.view.jsx');

var Heatmap_Query_View = require('./heatmap/heatmap_query.view.jsx');

var Server_Actions = require('../actions/server.action.js');

var Server_Store = require('../stores/servers.store.js');

var WebSocket_Actions = require('../actions/websocket.actions.js');

var Shell = React.createClass({
    mixins: [Reflux.ListenerMixin],

    getInitialState: function() {
        return {current_page: 'server_list', selected:null};
    },

    
    onStatusChange: function(data) {
        if(data.msg_type == "change_page") {
            this.setState({
                current_page: data.msg
            });
        }
    },

    componentDidMount: function() {
        Debug("componentDidMount");

        this.listenTo(Shell_Store, this.onStatusChange);

        // Server_Store.listen(function(status) {
        //     console.log('status: ', status);
        // });
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
        'overflow':'hidden',
    },
        
    render: function() {  

        if(this.state.current_page == 'server_list'){
            if(this.state.selected !== 'server_selected') {
                this.state.selected = null;
            }

            if(this.state.selected !== 'region_selected') {
                this.state.selected = null;
            }
        }

        if(this.state.current_page == 'region_list'){
            this.state.selected = 'server_selected';
        }

        if(this.state.current_page == 'region_dashboard'){
            this.state.selected = 'region_selected';
        }

        return (<div style={this.style_base}>
                    <Header_View selected={this.state.selected}/>

                    { this.state.current_page == 'server_list' ? <Server_View /> : null }
                    { this.state.current_page == 'region_list' ? <Region_View /> : null }     
                    { this.state.current_page == 'region_dashboard' ? <Region_Dashboard_View /> : null } 
                    { this.state.current_page == 'heatmap_query' ? <Heatmap_Query_View /> : null }

                </div>);


    }
});

module.exports = Shell;