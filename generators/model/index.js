/*jshint latedef:false */
var util = require('util');
var yeoman = require('yeoman-generator');
var scriptBase = require('../../script-base');

var ModelGenerator = scriptBase.extend({
  constructor: function (name) {
    scriptBase.apply(this, arguments);

    // XXX default and banner to be implemented
    this.argument('attributes', {
      type: Array,
      defaults: [],
      banner: 'field[:type] field[:type]'
    });

    // parse back the attributes provided, build an array of attr
    this.attrs = this['attributes'].map(function (attr) {
      var parts = attr.split(':');
      return {
        name: parts[0],
        type: parts[1] || 'string'
      };
    });
  },

  writing: {
    createModelFiles: function () {
      this._generate('model');
    },

    composeTest: function () {
      this._generateTest('model');
    }
  }
});

module.exports = ModelGenerator;
