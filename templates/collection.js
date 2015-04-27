/*global <%= _.camelize(appname) %>, Backbone*/

<%= _.camelize(appname) %>.Collections = <%= _.camelize(appname) %>.Collections || {};

(function () {
  'use strict';

  <%= _.camelize(appname) %>.Collections.<%= _.classify(name) %> = Backbone.Collection.extend({

    model: <%= _.camelize(appname) %>.Models.<%= _.classify(name) %>

  });

})();
