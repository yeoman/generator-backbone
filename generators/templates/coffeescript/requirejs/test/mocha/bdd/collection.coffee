# global beforeEach, describe, it, assert, expect
'use strict'

<%= className %> = require('collections/<%= name %>')

describe '<%= className %> Collection', ->
  beforeEach ->
    @<%= className %>Collection = new <%= className %>()
