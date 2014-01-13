/*global <%= _.camelize(appname) %>, Backbone*/

<%= _.camelize(appname) %>.Models = <%= _.camelize(appname) %>.Models || {};

(function () {
    'use strict';

    <%= _.camelize(appname) %>.Models.<%= _.classify(name) %>Model = Backbone.Model.extend({

        url: '',

        initialize: function() {
        },

        defaults: {
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();
