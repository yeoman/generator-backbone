/*global define*/

define([
    'jquery',
    'backbone'
], function ($, Backbone) {
    'use strict';

    var <%= _.classify(name) %>Router = Backbone.Router.extend({
        routes: {
        }

    });

    return <%= _.classify(name) %>Router;
});
