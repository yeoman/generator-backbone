window.<%= _.camelize(appname) %> =
  Models: {}
  Collections: {}
  Views: {}
  Routers: {}
  init: ->
    console.log 'Hello from Backbone!'



$ ->
  <%= _.camelize(appname) %>.init();
