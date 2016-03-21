# global suite, test, assert, setup, bb
'use strict';

<%= className %> = require('models/<%= name %>')

suite '<%= className %> Model', ->
  setup ->
    @<%= className %>Model = new <%= className %>()
