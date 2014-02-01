'use strict';

class <%= _.camelize(appname) %>.Views.<%= _.classify(name) %> extends Backbone.View

  template: JST['<%= jst_path %>']

  tagName: 'div'

  id: ''

  className: ''

  events: {}

  initialize: () ->
    @listenTo @model, 'change', @render

  render: () ->
    @$el.html @template(@model.toJSON())
