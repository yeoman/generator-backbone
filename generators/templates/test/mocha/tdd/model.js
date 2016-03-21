/*global suite, test, assert, setup, bb*/
'use strict';

suite('<%= className %> Model', function () {

    setup(function () {
        this.<%= name %>Model = new <%= appClassName %>.Models.<%= className %>();
    });

});
