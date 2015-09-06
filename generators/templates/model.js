/*global <%= appClassName %>, Backbone*/

<%= appClassName %>.Models = <%= appClassName %>.Models || {};

(function () {
  'use strict';

  <%= appClassName %>.Models.<%= className %> = Backbone.Model.extend({

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
