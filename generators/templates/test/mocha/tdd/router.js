/*global suite, test, assert, setup, bb*/
'use strict';

suite('<%= className %> Router', function () {

    setup(function () {
        this.<%= name %>Router = new <%= appClassName %>.Routers.<%= className %>();
    });

});
