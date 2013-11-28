/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var <%= _.classify(name) %>Model = Backbone.Model.extend({
        defaults: {
        }
    });

    return <%= _.classify(name) %>Model;
});
