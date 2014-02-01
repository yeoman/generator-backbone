'use strict';

class <%= _.camelize(appname) %>.Models.<%= _.classify(name) %> extends Backbone.Model
  url: '',

  initialize: () ->

  defaults: {}

  validate: (attrs, options) ->

  parse: (response, options) ->
    response
