/*global suite, test, assert, setup, bb*/
'use strict';

var <%= className %> = require('collections/<%= name %>');

suite('<%= className %> Collection', function () {

    setup(function () {
        this.<%= name %>Collection = new <%= className %>();
    });

});
