/*jshint latedef:false */
var path = require('path'),
  util = require('util'),
  yeoman = require('yeoman-generator'),
  scriptBase = require('../script-base');

module.exports = Generator;

function Generator() {
  scriptBase.apply(this,arguments);
  var dirPath = this.options.coffee ? '../templates/coffeescript/' : '../templates';
  this.sourceRoot(path.join(__dirname, dirPath));

  // XXX default and banner to be implemented
  this.argument('attributes', { type: Array, defaults: [], banner: 'field[:type] field[:type]' });

  // parse back the attributes provided, build an array of attr
  this.attrs = this.attributes.map(function(attr) {
    var parts = attr.split(':');
    return {
      name: parts[0],
      type: parts[1] || 'string'
    };
  });

}

util.inherits(Generator, scriptBase);

Generator.prototype.createModelFiles = function createModelFiles() {
  var ext = this.options.coffee ? 'coffee' : 'js';
  this.template('model.' + ext, path.join('app/scripts/models', this.name + '-model.' + ext));
  this.addScriptToIndex('models/' + this.name + '-model');
};
