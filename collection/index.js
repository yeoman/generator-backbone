/*jshint latedef:false */
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var scriptBase = require('../script-base');

var CollectionGenerator = scriptBase.extend({
  constructor: function () {
    scriptBase.apply(this, arguments);

    var dirPath = this.options.coffee ? '../templates/coffeescript/' : '../templates';
    this.sourceRoot(path.join(__dirname, dirPath));
  },

  writing: {
    createControllerFiles: function () {
      this._writeTemplate('collection', path.join(this.env.options.appPath + '/scripts/collections', this.name));

      if (!this.options.requirejs) {
        this._addScriptToIndex('collections/' + this.name);
      }
    },
    composeTest: function () {
      this._generateTest('collection');
    }
  },


});

module.exports = CollectionGenerator;
