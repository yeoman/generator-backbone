define [
  'underscore'
  'backbone'
], (_, Backbone) ->
  'use strict';

  class <%= className %>Model extends Backbone.Model
    url: '',

    initialize: () ->

    defaults: {}

    validate: (attrs, options) ->

    parse: (response, options) ->
      response
