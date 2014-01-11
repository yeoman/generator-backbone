/*global <%= _.camelize(appname) %>, Backbone*/

<%= _.camelize(appname) %>.Models = <%= _.camelize(appname) %>.Models || {};

(function () {
    'use strict';

    <%= _.camelize(appname) %>.Models.<%= _.classify(name) %>Model = Backbone.Model.extend({

        // The defaults hash (or function) can be used to specify the default
        // attributes for your model. When creating an instance of the model,
        // any unspecified attributes will be set to their default value.
        initialize: function() {
        },

        // The defaults hash (or function) can be used to specify the default
        // attributes for your model. When creating an instance of the model,
        // any unspecified attributes will be set to their default value.
        defaults: {
        },

        // Override it with your custom validation logic. By default validate is
        // called before save, but can also be called before set if
        // {validate:true} is passed. Return an error object or message if the
        // validation fails and else nothing.
        validate: function(attrs, options) {
            // if (attrs.end < attrs.start) {
            //   return "can't end before it starts";
            // }
        },

        // Returns the relative URL where the model's resource would be located
        // on the server.
        url: '',

        // The function is passed the raw response object, and should return the
        // attributes hash to be set on the model.
        parse: function(response, options)  {
            return response;
        }
    });

})();
