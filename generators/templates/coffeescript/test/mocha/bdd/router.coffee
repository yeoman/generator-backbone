# global beforeEach, describe, it, assert, expect
'use strict'

describe '<%= className %> Router', ->
  beforeEach ->
    @<%= className %>Router = new <%= appClassName %>.Routers.<%= className %>();

  it 'index route', ->

