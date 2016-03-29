/*jshint latedef:false */
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var ScriptBase = require('../../script-base');

var RouterGenerator = ScriptBase.extend({

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
