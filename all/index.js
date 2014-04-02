/*jshint latedef:false */
var util = require('util');
var yeoman = require('yeoman-generator');

module.exports = Generator;

function Generator() {
  yeoman.generators.Base.apply(this, arguments);

  // the api to hookFor and pass arguments may vary a bit.
  this.hookFor('backbone:router', {
    args: arguments[0][1] ? arguments[0][1] : arguments[0][0] + 's'
  });
  this.hookFor('backbone:model', {
    args: arguments[0][0]
  });
  this.hookFor('backbone:collection', {
    args: arguments[0][1] ? arguments[0][1] : arguments[0][0] + 's'
  });
  this.hookFor('backbone:view', {
    args: arguments[0][0]
  });
  this.hookFor('backbone:view', {
    args: arguments[0][1] ? arguments[0][1] : arguments[0][0] + 's'
  });
}

util.inherits(Generator, yeoman.generators.Base);
