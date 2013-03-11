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

}

util.inherits(Generator, scriptBase);

Generator.prototype.createViewFiles = function createViewFiles() {
  var ext = this.options.coffee ? 'coffee' : 'js';
  this.template('view.' + ext, path.join('app/scripts/views', this.name + '-view.' + ext));
  this.template('view.ejs', path.join('app/scripts/templates', this.name + '.ejs'));
  this.addScriptToIndex('views/' + this.name + '-view');
};
