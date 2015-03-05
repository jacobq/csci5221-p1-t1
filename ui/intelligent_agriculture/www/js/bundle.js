(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};


},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVm9sdW1lcy9OTyBOQU1FL3NjaG9vbC9zcHJpbmdfMjAxNS9jc2NpXzUyMjEvcHJvamVjdF8xL2NzY2k1MjIxLXAxLXQxL3VpL2ludGVsbGlnZW50X2FncmljdWx0dXJlL3d3dy9idWlsZC9zcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7R0FFRztBQUNILElBQUksR0FBRyxHQUFHOztJQUVOLFVBQVUsRUFBRSxXQUFXO1FBQ25CLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUMxQixLQUFLO0FBQ0w7QUFDQTtBQUNBOztJQUVJLFVBQVUsRUFBRSxXQUFXO1FBQ25CLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUM1RSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztJQUVJLGFBQWEsRUFBRSxXQUFXO1FBQ3RCLEdBQUcsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDekMsS0FBSzs7SUFFRCxhQUFhLEVBQUUsU0FBUyxFQUFFLEVBQUU7UUFDeEIsSUFBSSxhQUFhLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoRCxJQUFJLGdCQUFnQixHQUFHLGFBQWEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDekUsUUFBUSxJQUFJLGVBQWUsR0FBRyxhQUFhLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDOztRQUUvRCxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0FBQ2hFLFFBQVEsZUFBZSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQzs7UUFFeEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsR0FBRyxFQUFFLENBQUMsQ0FBQztLQUN4QztDQUNKLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLypcbiAqIExpY2Vuc2VkIHRvIHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbiAoQVNGKSB1bmRlciBvbmVcbiAqIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiAgU2VlIHRoZSBOT1RJQ0UgZmlsZVxuICogZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb25cbiAqIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLiAgVGhlIEFTRiBsaWNlbnNlcyB0aGlzIGZpbGVcbiAqIHRvIHlvdSB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGVcbiAqIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZVxuICogd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZyxcbiAqIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXG4gKiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxuICogS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlXG4gKiBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXG4gKiB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xudmFyIGFwcCA9IHtcbiAgICAvLyBBcHBsaWNhdGlvbiBDb25zdHJ1Y3RvclxuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICB9LFxuICAgIC8vIEJpbmQgRXZlbnQgTGlzdGVuZXJzXG4gICAgLy9cbiAgICAvLyBCaW5kIGFueSBldmVudHMgdGhhdCBhcmUgcmVxdWlyZWQgb24gc3RhcnR1cC4gQ29tbW9uIGV2ZW50cyBhcmU6XG4gICAgLy8gJ2xvYWQnLCAnZGV2aWNlcmVhZHknLCAnb2ZmbGluZScsIGFuZCAnb25saW5lJy5cbiAgICBiaW5kRXZlbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZGV2aWNlcmVhZHknLCB0aGlzLm9uRGV2aWNlUmVhZHksIGZhbHNlKTtcbiAgICB9LFxuICAgIC8vIGRldmljZXJlYWR5IEV2ZW50IEhhbmRsZXJcbiAgICAvL1xuICAgIC8vIFRoZSBzY29wZSBvZiAndGhpcycgaXMgdGhlIGV2ZW50LiBJbiBvcmRlciB0byBjYWxsIHRoZSAncmVjZWl2ZWRFdmVudCdcbiAgICAvLyBmdW5jdGlvbiwgd2UgbXVzdCBleHBsaWNpdGx5IGNhbGwgJ2FwcC5yZWNlaXZlZEV2ZW50KC4uLik7J1xuICAgIG9uRGV2aWNlUmVhZHk6IGZ1bmN0aW9uKCkge1xuICAgICAgICBhcHAucmVjZWl2ZWRFdmVudCgnZGV2aWNlcmVhZHknKTtcbiAgICB9LFxuICAgIC8vIFVwZGF0ZSBET00gb24gYSBSZWNlaXZlZCBFdmVudFxuICAgIHJlY2VpdmVkRXZlbnQ6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIHZhciBwYXJlbnRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgICAgICB2YXIgbGlzdGVuaW5nRWxlbWVudCA9IHBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmxpc3RlbmluZycpO1xuICAgICAgICB2YXIgcmVjZWl2ZWRFbGVtZW50ID0gcGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcucmVjZWl2ZWQnKTtcblxuICAgICAgICBsaXN0ZW5pbmdFbGVtZW50LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnZGlzcGxheTpub25lOycpO1xuICAgICAgICByZWNlaXZlZEVsZW1lbnQuc2V0QXR0cmlidXRlKCdzdHlsZScsICdkaXNwbGF5OmJsb2NrOycpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCdSZWNlaXZlZCBFdmVudDogJyArIGlkKTtcbiAgICB9XG59O1xuIl19
