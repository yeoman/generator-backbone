/*global suite, test, assert, setup, bb*/
'use strict';

var <%= className %> = require('routes/<%= name %>');

suite('<%= className %> Router', function () {

    setup(function () {
        this.<%= name %>Router = new <%= className %>();
    });

});
