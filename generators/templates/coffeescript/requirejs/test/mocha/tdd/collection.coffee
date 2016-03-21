# global suite, test, assert, setup, bb
'use strict';

<%= className %> = require('collections/<%= name %>')

suite '<%= className %> Collection', ->
  setup ->
    @<%= className %>Collection = new <%= className %>()
