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
  },

  writing: {
    routerFiles: function () {
      this._writeTemplate('router', path.join(this.env.options.appPath + '/scripts/routes', this.name));

      if (!this.options.requirejs) {
        this._addScriptToIndex('routes/' + this.name);
      }
    },

    composeTest: function () {
      this._generateTest('router');
    }
  }
});

module.exports = RouterGenerator;
