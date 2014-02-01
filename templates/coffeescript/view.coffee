'use strict';

class <%= _.camelize(appname) %>.Views.<%= _.classify(name) %> extends Backbone.View

    template: JST['<%= jst_path %>']
