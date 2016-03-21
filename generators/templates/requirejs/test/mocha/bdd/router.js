/*global beforeEach, describe, it, assert, expect*/
'use strict';

var <%= className %> = require('routes/<%= name %>');

describe('<%= className %> Router', function () {

    beforeEach(function () {
        this.<%= name %>Router = new <%= className %>();
    });

    it('index route', function(){

    });

});
