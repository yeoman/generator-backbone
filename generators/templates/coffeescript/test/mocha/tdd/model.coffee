# global suite, test, assert, setup, bb
'use strict';

suite '<%= className %> Model', ->
  setup ->
    @<%= className %>Model = new <%= appClassName %>.Models.<%= className %>()
