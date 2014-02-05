'use strict';

class <%= _.camelize(appname) %>.Collections.<%= _.classify(name) %> extends Backbone.Collection
  model: <%= _.camelize(appname) %>.Models.<%= _.classify(name) %>
