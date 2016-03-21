/*jshint latedef:false */
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var scriptBase = require('../../script-base');

var RouterGenerator = scriptBase.extend({
  constructor: function () {
    scriptBase.apply(this, arguments);
    var dirPath = this.options.coffee ? '../templates/coffeescript/' : '../templates';
    this.sourceRoot(path.join(__dirname, dirPath));
  },

  writing: {
    createRouterFiles: function () {
      this._generate('router', {}, 'routes');
    },

    composeTest: function () {
      this._generateTest('router', {}, 'routes');
    }
  }
});

module.exports = RouterGenerator;
