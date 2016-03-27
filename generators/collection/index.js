/*jshint latedef:false */
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var ScriptBase = require('../../script-base');

var CollectionGenerator = ScriptBase.extend({

  writing: {
    createCollectionFiles: function () {
      this._generate('collection');
    },
    composeTest: function () {
      this._generateTest('collection');
    }
  }

});

module.exports = CollectionGenerator;
