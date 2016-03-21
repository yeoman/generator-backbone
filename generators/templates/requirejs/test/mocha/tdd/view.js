/*global suite, test, assert, setup, bb*/
'use strict';

var <%= className %> = require('views/<%= name %>');

suite('<%= className %> View', function () {

    setup(function () {
        this.<%= name %>View = new <%= className %>();
    });

});
