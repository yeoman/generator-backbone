/*jshint latedef:false */
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var scriptBase = require('../script-base');

var RouterGenerator = scriptBase.extend({
  constructor: function () {
    scriptBase.apply(this, arguments);
    var dirPath = this.options.coffee ? '../templates/coffeescript/' : '../templates';
    this.sourceRoot(path.join(__dirname, dirPath));

    var testOptions = {
      as: 'router',
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

  createControllerFiles: function () {
    this.writeTemplate('router', path.join(this.env.options.appPath + '/scripts/routes', this.name));

    if (!this.options.requirejs) {
      this.addScriptToIndex('routes/' + this.name);
    }
  }
});

module.exports = RouterGenerator;
