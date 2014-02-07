define [
  'underscore'
  'backbone'
], (_, Backbone) ->
  'use strict';

  class <%= _.classify(name) %>Model extends Backbone.Model
    url: '',

    initialize: () ->

    defaults: {}

    validate: (attrs, options) ->

    parse: (response, options) ->
      response
