/*global <%= _.camelize(appname) %> Backbone JST*/

<%= _.camelize(appname) %>.Views.<%= _.classify(name) %>View = Backbone.View.extend({

    template: JST['<%= jst_path %>']

});
