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

/* Order and include as you please. */
require('.tmp/scripts/templates');
require('app/scripts/views/*');
require('app/scripts/models/*');
require('app/scripts/collections/*');
require('app/scripts/routes/*');

$(document).ready(function () {
    'use strict';
    <%= _.camelize(appname) %>.init();
});
