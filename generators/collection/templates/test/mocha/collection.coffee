# global beforeEach, describe, it, assert, expect
'use strict'

describe '<%= className %> Collection', ->
  beforeEach ->
    @<%= className %>Collection = new <%= appClassName %>.Collections.<%= className %>()
