/*global define*/

define([
  'underscore',
  'backbone',
  'models/<%= className %>'
], function (_, Backbone, <%= className %>Model) {
  'use strict';

  var <%= className %>Collection = Backbone.Collection.extend({
    model: <%= className %>Model
  });

  return <%= className %>Collection;
});
