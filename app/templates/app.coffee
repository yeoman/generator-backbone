window.<%= _.camelize(appname) %> =
  Models: {}
  Collections: {}
  Views: {}
  Routers: {}
  init: ->
    'use strict'
    console.log 'Hello from Backbone!'

$ ->
  'use strict'
  <%= _.camelize(appname) %>.init();
