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
            // if (attrs.end < attrs.start) {
            //   return "can't end before it starts";
            // }
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();
