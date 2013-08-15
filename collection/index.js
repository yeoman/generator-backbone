/*jshint latedef:false */
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var scriptBase = require('../script-base');

module.exports = Generator;

function Generator() {
  scriptBase.apply(this, arguments);
  var dirPath = this.options.coffee ? '../templates/coffeescript/' : '../templates';
  this.sourceRoot(path.join(__dirname, dirPath));

  // required for collection.js template which uses `appname`
}

util.inherits(Generator, scriptBase);

Generator.prototype.createControllerFiles = function createControllerFiles() {
  var ext = this.options.coffee ? '.coffee' : '.js';
  var destFile = path.join('app/scripts/collections', this.name + ext);
  var isRequireJsApp = this.isUsingRequireJS();

  if (!isRequireJsApp) {
    this.template('collection' + ext, destFile);
    this.addScriptToIndex('collections/' + this.name);
    return;
  }

  var template = [
    '/*global define*/',
    '',
    'define([',
    '    \'underscore\',',
    '    \'backbone\',',
    '    \'models/' + this.name + '\'',
    '], function (_, Backbone, ' + this._.classify(this.name) + 'Model' + ') {',
    '    \'use strict\';',
    '',
    '    var ' + this._.classify(this.name) + 'Collection = Backbone.Collection.extend({',
    '        ' + 'model: ' + this._.classify(this.name) + 'Model',
    '    });',
    '',
    '    return ' + this._.classify(this.name) + 'Collection;',
    '});'
  ].join('\n');

  this.write(destFile, template);
};
