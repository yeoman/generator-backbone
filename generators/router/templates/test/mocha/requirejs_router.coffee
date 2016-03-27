# global beforeEach, describe, it, assert, expect
'use strict'

<%= className %> = require('routes/<%= name %>')

describe '<%= className %> Router', ->
  beforeEach ->
    @<%= className %>Router = new <%= className %>();

  it 'index route', ->

