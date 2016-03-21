# global suite, test, assert, setup, bb
'use strict';

<%= className %> = require('views/<%= name %>')

suite '<%= className %> View', ->
  setup ->
    @<%= className %>View = new <%= className %>()
