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

var Content_View = require('./content.view.jsx');

var Server_View = require('./servers.view.jsx');

var Add_Server_View = require('./servers/add_server.view.jsx');
var Edit_Server_View = require('./servers/edit_server.view.jsx');

var Region_View = require('./regions.view.jsx');
var Region_Dashboard_View = require('./region_dashboard.view.jsx');

var Heatmap_View = require('./heatmap.view.jsx');

var Server_Actions = require('../actions/server.action.js');

var Server_Store = require('../stores/servers.store.js');

var WebSocket_Actions = require('../actions/websocket.actions.js');

var Shell = React.createClass({
    mixins: [Reflux.ListenerMixin],

    getInitialState: function() {
        return {current_page: 'server_list', selected:null, slide_dir: 'left', v_slide_state: 'down', slide:"left", 'page_data': null};
    },

    
    onStatusChange: function(data) {

        if(data.msg_type == "change_page") {
            this.setState({
                slide_dir: data.msg.slide_dir,
                current_page: data.msg.page,
                page_data: data.msg.page_data
            });
        }

        else if(data.msg_type == "change_page_edit"){
            this.setState({
                slide_dir: data.msg.slide_dir,
                current_page: data.msg.page,
                page_data: data.msg.page_data

            })
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
                    <Header_View selected={this.state.selected}/>
                    
                    <ReactCSSTransitionGroup transitionName={trans}>
                        { this.state.current_page == 'server_list' ? <Server_View /> : null }
                    </ReactCSSTransitionGroup>

                    <ReactCSSTransitionGroup transitionName={trans}>
                        { this.state.current_page == 'add_server' ? <Add_Server_View page_mode="create" /> : null } 
                    </ReactCSSTransitionGroup>  

                    <ReactCSSTransitionGroup transitionName={trans}>
                        { this.state.current_page == 'edit_server' ? <Add_Server_View page_mode="edit" page_data={this.state.page_data} /> : null } 
                    </ReactCSSTransitionGroup>
                    
                    <ReactCSSTransitionGroup transitionName={trans}>
                        { this.state.current_page == 'region_list' ? <Region_View /> : null }   
                    </ReactCSSTransitionGroup>  

                    <ReactCSSTransitionGroup transitionName={trans}>
                        { this.state.current_page == 'region_dashboard' ? <Region_Dashboard_View page_data={this.state.page_data} /> : null } 
                    </ReactCSSTransitionGroup>  

                    { this.state.current_page == 'heatmap' ? <Heatmap_View page_data={this.state.page_data}/> : null }
                    { this.state.current_page == 'null' ?<Content_View slideUp={this.state.content_slide_up == true ? 88 : null}/> : null }
                </div>);
    }
});

module.exports = Shell;
