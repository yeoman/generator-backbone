# global beforeEach, describe, it, assert, expect
'use strict'

<%= className %> = require('models/<%= name %>')

describe '<%= className %> Model', ->
  beforeEach ->
    @<%= className %>Model = new <%= className %>();
