/*global <%= _.camelize(appname) %>, $*/


window.<%= _.camelize(appname) %> = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        console.log('Hello from Backbone!');
    }
};

$(document).ready(function () {
    'use strict';
    <%= _.camelize(appname) %>.init();
});
