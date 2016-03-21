# global suite, test, assert, setup, bb
'use strict';

suite '<%= className %> View', ->
  setup ->
    @<%= className %>View = new <%= appClassName %>.Views.<%= className %>()
