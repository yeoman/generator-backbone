# global beforeEach, describe, it, assert, expect
'use strict'

<%= className %> = require('views/<%= name %>')

describe '<%= className %> View', ->
  beforeEach ->
    @<%= className %>View = new <%= className %>();
