define [
  'jquery'
  'underscore'
  'backbone'
  'templates'
], ($, _, Backbone, JST) ->
  class <%= className %>View extends Backbone.View
    template: JST['<%= jst_path %>']

    tagName: 'div'

    id: ''

    className: ''

    events: {}

    initialize: () ->
        @listenTo @model, 'change', @render

    render: () ->
        @$el.html @template(@model.toJSON())
