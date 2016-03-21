/*global beforeEach, describe, it, assert, expect*/
'use strict';

var <%= className %> = require('models/<%= name %>');

describe('<%= className %> Model', function () {

    beforeEach(function () {
        this.<%= name %>Model = new <%= className %>();
    });

});
