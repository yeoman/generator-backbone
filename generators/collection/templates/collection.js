/*global <%= appClassName %>, Backbone*/

<%= appClassName %> = window.<%= appClassName %> || {};
<%= appClassName %>.Collections = <%= appClassName %>.Collections || {};

(function () {
  'use strict';

  <%= appClassName %>.Collections.<%= className %> = Backbone.Collection.extend({

    model: <%= appClassName %>.Models.<%= className %>

  });

})();
