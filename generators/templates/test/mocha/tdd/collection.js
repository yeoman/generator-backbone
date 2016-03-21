/*global suite, test, assert, setup, bb*/
'use strict';

suite('<%= className %> Collection', function () {

    setup(function () {
        this.<%= name %>Collection = new <%= appClassName %>.Collections.<%= className %>();
    });

});
