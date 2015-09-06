/*global define*/

define([
  'jquery',
  'backbone'
], function ($, Backbone) {
  'use strict';

  var <%= className %>Router = Backbone.Router.extend({
    routes: {
    }

  });

  return <%= className %>Router;
});
