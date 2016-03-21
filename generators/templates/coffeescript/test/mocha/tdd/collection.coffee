# global suite, test, assert, setup, bb
'use strict';

suite '<%= className %> Collection', ->
  setup ->
    @<%= className %>Collection = new <%= appClassName %>.Collections.<%= className %>()
