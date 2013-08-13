window.<%= _.camelize(appname) %> =
  Models: {}
  Collections: {}
  Views: {}
  Routers: {}
  init: ->
    'use strict'
    console.log 'Hello from Backbone!'

# Order and include as you please.
require('.tmp/scripts/templates');
require('.tmp/scripts/views/*');
require('.tmp/scripts/models/*');
require('.tmp/scripts/collections/*');
require('.tmp/scripts/routes/*');

$ ->
  'use strict'
  <%= _.camelize(appname) %>.init();
