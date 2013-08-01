window.<%= _.camelize(appname) %> =
  Models: {}
  Collections: {}
  Views: {}
  Routers: {}
  init: ->
    console.log 'Hello from Backbone!'

# Order and include as you please.
require('.tmp/scripts/templates');
require('.tmp/scripts/views/*');
require('.tmp/scripts/models/*');
require('.tmp/scripts/collections/*');
require('.tmp/scripts/routes/*');

$ ->
  <%= _.camelize(appname) %>.init();
