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

  var testOptions = {
    as: 'router',
    args: [this.name],
    options: {
      coffee: this.config.get('coffee'),
      ui: this.config.get('ui')
    }
  };

  if (this.generateTests()){
    this.hookFor('backbone-mocha', testOptions);
  }
}

util.inherits(Generator, scriptBase);

Generator.prototype.createControllerFiles = function createControllerFiles() {
  this.writeTemplate('router', path.join(this.env.options.appPath + '/scripts/routes', this.name));

  if (!this.options.requirejs) {
    this.addScriptToIndex('routes/' + this.name);
  }
};
