define [
  'underscore'
  'backbone'
  'models/<%= _.classify(name) %>-model'
], (_, Backbone, <%= _.classify(name) %>Model) ->

  class <%= _.classify(name) %>Collection extends Backbone.Collection
    model: <%= _.classify(name) %>Model