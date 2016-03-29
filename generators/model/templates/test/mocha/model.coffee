# global beforeEach, describe, it, assert, expect
'use strict'

describe '<%= className %> Model', ->
  beforeEach ->
    @<%= className %>Model = new <%= appClassName %>.Models.<%= className %>();
