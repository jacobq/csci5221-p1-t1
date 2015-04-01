/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var Reflux = require('reflux');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Debug = require('debug')('Server_List:View');

var Server_Actions = require('../../actions/server.action.js');
var Server_Store = require('../../stores/servers.store.js');

var Server_List_Element_View = require('./server_list_element.view.jsx');

module.exports = React.createClass({
    mixins: [Reflux.ListenerMixin],

    getInitialState: function() {
        return {server_list: []};
    },

    onStatusChange: function(data) {
        this.setState({
            server_list: data
        });
    },
    componentWillMount: function() {
        this.listenTo(Server_Store, this.onStatusChange);
    },

    componentDidMount: function() {
        Debug("componentDidMount");

        Server_Actions.request();

        

        Server_Actions.register({'server_id' : 'test_1', 'server_name' : 'Localhost', 'server_url' : 'csci5221.web-controllable.com' ,'server_port' : null})
        // Server_Actions.register({'server_id' : 'test_2', 'server_name' : 'Locnnalhost', 'server_url' : '127.0.0.1', 'server_port': 8888})
    },

    componentWillUnmount: function() {
    },

    style_base: {
        'height' : '90%',
        'width' : '100%',
        'background' : 'rgba(221,209,180,1.0)',
        'position':'absolute',
        'top': 0,
        'left': 0,
        'padding': 0,
        'margin': 0,
        'textAlign' : 'center',
        'fontFamily': '"Arial Black", Gadget, sans-serif',
        'overflowY': 'scroll',
        'borderTop': 'solid 1px rgba(33,33,33,1.0)',
        'borderBottom': 'solid 1px rgba(33,33,33,1.0)',
        'listStyle' : 'none',
    },
        
    render: function() {            
            return (<ol style={this.style_base}>
                        <ReactCSSTransitionGroup transitionName="example">
                            {this.state.server_list.map(function(data) {
                                return <Server_List_Element_View key= {data.server_id} server_data = {data}/>;
                            })}
                        </ReactCSSTransitionGroup>
                    </ol>);
    }
});