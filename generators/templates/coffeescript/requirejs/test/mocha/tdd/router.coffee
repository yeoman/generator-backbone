# global suite, test, assert, setup, bb
'use strict';

<%= className %> = require('routes/<%= name %>')

suite '<%= className %> Router', ->
  setup ->
    @<%= className %>Router = new <%= className %>()
