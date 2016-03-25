window.<%= appPascalCaseName %> =
  Models: {}
  Collections: {}
  Views: {}
  Routers: {}
  init: ->
    'use strict'
    console.log 'Hello from Backbone!'

$ ->
  'use strict'
  <%= appPascalCaseName %>.init();
