# global suite, test, assert, setup, bb
'use strict';

suite '<%= className %> Router', ->
  setup ->
    @<%= className %>Router = new <%= appClassName %>.Routers.<%= className %>()
