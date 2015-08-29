define [
  'underscore'
  'backbone'
  'models/<%= className %>-model'
], (_, Backbone, <%= className %>Model) ->

  class <%= className %>Collection extends Backbone.Collection
    model: <%= className %>Model
