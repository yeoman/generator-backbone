/*jshint latedef:false */
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var scriptBase = require('../script-base');

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
    this.attrs = this.attributes.map(function (attr) {
      var parts = attr.split(':');
      return {
        name: parts[0],
        type: parts[1] || 'string'
      };
    });
  },

  writing: {
    createModelFiles: function () {
      this._writeTemplate('model', path.join(this.env.options.appPath + '/scripts/models', this.name));

      if (!this.options.requirejs) {
        this._addScriptToIndex('models/' + this.name);
      }
    },

    composeTest: function () {
      this._generateTest('model');
    }
  }
});

module.exports = ModelGenerator;
