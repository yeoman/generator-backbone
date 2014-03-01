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

    var testOptions = {
      as: 'model',
      args: [this.name],
      options: {
        coffee: this.config.get('coffee'),
        ui: this.config.get('ui')
      }
    };

    if (this.generateTests()) {
      this.hookFor('backbone-mocha', testOptions);
    }

  },

  createModelFiles: function () {
    this.writeTemplate('model', path.join(this.env.options.appPath + '/scripts/models', this.name));

    if (!this.options.requirejs) {
      this.addScriptToIndex('models/' + this.name);
    }
  }
});

module.exports = ModelGenerator;
