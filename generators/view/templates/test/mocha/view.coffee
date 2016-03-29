# global beforeEach, describe, it, assert, expect
'use strict'

describe '<%= className %> View', ->
  beforeEach ->
    @<%= className %>View = new <%= appClassName %>.Views.<%= className %>();
