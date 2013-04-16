/*global <%= _.camelize(appname) %>, $*/
'use strict';


window.<%= _.camelize(appname) %> = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        console.log('Hello from Backbone!');
    }
};

$(document).ready(function () {
    <%= _.camelize(appname) %>.init();
});
