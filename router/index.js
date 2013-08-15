/*jshint latedef:false */
var path = require('path'),
  util = require('util'),
  yeoman = require('yeoman-generator'),
  scriptBase = require('../script-base');

module.exports = Generator;

function Generator() {
  scriptBase.apply(this, arguments);
  var dirPath = this.options.coffee ? '../templates/coffeescript/' : '../templates';
  this.sourceRoot(path.join(__dirname, dirPath));

  // required for router.js template which uses `appname`
}

util.inherits(Generator, scriptBase);

Generator.prototype.createControllerFiles = function createControllerFiles() {
  var ext = this.options.coffee ? '.coffee' : '.js';
  var destFile = path.join('app/scripts/routes', this.name + ext);
  this.isRequireJsApp = this.isUsingRequireJS();

  if (!this.isRequireJsApp) {
    this.template('router' + ext, destFile);
    this.addScriptToIndex('routes/' + this.name);
    return;
  }

  var template = [
    '/*global define*/',
    '',
    'define([',
    '    \'jquery\',',
    '    \'backbone\'',
    '], function ($, Backbone) {',
    '    \'use strict\';',
    '',
    '    var ' + this._.classify(this.name) + 'Router = Backbone.Router.extend({',
    '        routes: {',
    '        }',
    '',
    '    });',
    '',
    '    return ' + this._.classify(this.name) + 'Router;',
    '});'
  ].join('\n');

  this.write(destFile, template);

};
