/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var Reflux = require('reflux');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Debug = require('debug')('Server_List:View');

var Region_List_Element_View = require('./region_list_element.view.jsx');

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
                            {this.props.region_list.map(function(data) {
                                return <Region_List_Element_View key={data.id} region_data={data}/>;
                            })}
                        </ReactCSSTransitionGroup>
                       
                    </ol>);
    }
});