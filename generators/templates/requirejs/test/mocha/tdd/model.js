/*global suite, test, assert, setup, bb*/
'use strict';

var <%= className %> = require('models/<%= name %>');

suite('<%= className %> Model', function () {

    setup(function () {
        this.<%= name %>Model = new <%= className %>();
    });

});
