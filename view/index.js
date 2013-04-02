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
  this.jst_path = path.join('app/scripts/templates', this.name + '.ejs');
  this.template('view.ejs', this.jst_path);
  this.template('view.' + ext, path.join('app/scripts/views', this.name + '-view.' + ext));
  this.addScriptToIndex('views/' + this.name + '-view');
};
