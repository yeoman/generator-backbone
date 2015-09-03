/*global <%= appClassName %>, Backbone, JST*/

<%= appClassName %>.Views = <%= appClassName %>.Views || {};

(function () {
  'use strict';

  <%= appClassName %>.Views.<%= className %> = Backbone.View.extend({

    template: JST['<%= jst_path %>'],

    tagName: 'div',

    id: '',

    className: '',

    events: {},

    initialize: function () {
      this.listenTo(this.model, 'change', this.render);
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
    }

  });

})();
