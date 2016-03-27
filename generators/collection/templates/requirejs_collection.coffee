define [
  'underscore'
  'backbone'
  'models/<%= name %>'
], (_, Backbone, <%= className %>Model) ->

  class <%= className %>Collection extends Backbone.Collection
    model: <%= className %>Model
