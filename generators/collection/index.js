/*jshint latedef:false */
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var scriptBase = require('../../script-base');

var CollectionGenerator = scriptBase.extend({
  constructor: function () {
    scriptBase.apply(this, arguments);

    var dirPath = this.options.coffee ? '../templates/coffeescript/' : '../templates';
    this.sourceRoot(path.join(__dirname, dirPath));
  },

  writing: {
    createCollectionFiles: function () {
      this._generate('collection');
    },
    composeTest: function () {
      this._generateTest('collection');
    }
  },


});

module.exports = CollectionGenerator;
