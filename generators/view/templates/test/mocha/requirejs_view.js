/*global beforeEach, describe, it, assert, expect*/
'use strict';

var <%= className %> = require('views/<%= name %>');

describe('<%= className %> View', function () {

    beforeEach(function () {
        this.<%= name %>View = new <%= className %>();
    });

});
