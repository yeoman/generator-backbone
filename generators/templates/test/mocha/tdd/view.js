/*global suite, test, assert, setup, bb*/
'use strict';

suite('<%= className %> View', function () {

    setup(function () {
        this.<%= name %>View = new <%= appClassName %>.Views.<%= className %>();
    });

});
