define [
  'backbone'
], (Backbone) ->
  class <%= _.classify(name) %>Router extends Backbone.Router
    routes: {}