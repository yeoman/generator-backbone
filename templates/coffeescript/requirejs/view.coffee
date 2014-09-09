define [
  'jquery'
  'underscore'
  'backbone'
  'templates'
], ($, _, Backbone, JST) ->
  class <%= _.classify(name) %>View extends Backbone.View
    template: JST['<%= jst_path %>']

    tagName: 'div'

    id: ''

    className: ''

    events: {}

    initialize: () ->
        @listenTo @model, 'change', @render

    render: () ->
    <% if(templateFramework === 'mustache'){ %>
        @$el.html @template.render(@model.toJSON())  
    <% } else { %>
        @$el.html @template(@model.toJSON())   
    <% } %>
