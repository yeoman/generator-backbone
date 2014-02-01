/*global <%= _.camelize(appname) %>, Backbone, JST*/

<%= _.camelize(appname) %>.Views = <%= _.camelize(appname) %>.Views || {};

(function () {
    'use strict';

    <%= _.camelize(appname) %>.Views.<%= _.classify(name) %> = Backbone.View.extend({

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
