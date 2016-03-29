/*global beforeEach, describe, it, assert, expect*/
'use strict';

var <%= className %> = require('collections/<%= name %>');

describe('<%= className %> Collection', function () {

    beforeEach(function () {
        this.<%= name %>Collection = new <%= className %>();
    });

});
