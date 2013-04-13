var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');

module.exports = Generator;

function Generator() {
  yeoman.generators.Base.apply(this, arguments);

  var dirPath = this.options.coffee ? '../templates/coffeescript/' : '../templates';
  this.sourceRoot(path.join(__dirname, dirPath));

  this.dirs = 'models collections views routes helpers templates'.split(' ');

  this.option('coffee');

  var args = [ 'application' ];

  if (this.options.coffee) {
    args.push('--coffee');
  }

  // the api to hookFor and pass arguments may vary a bit.
  this.hookFor('backbone:app', {
    args: args
  });
  this.hookFor('backbone:router', {
    args: args
  });
  this.hookFor('backbone:view', {
    args: args
  });
  this.hookFor('backbone:model', {
    args: args
  });
  this.hookFor('backbone:collection', {
    args: args
  });

  this.on('end', function () {
    console.log('\nI\'m all done. Just run ' + 'npm install && bower install'.bold.yellow + ' to install the required dependencies.');
  });
}

util.inherits(Generator, yeoman.generators.Base);


Generator.prototype.createDirLayout = function createDirLayout() {
  this.dirs.forEach(function (dir) {
    this.log.create('app/scripts/' + dir);
    this.mkdir(path.join('app/scripts', dir));
  }.bind(this));
};

Generator.prototype.createAppFile = function createAppFile() {
  var ext = this.options.coffee ? 'coffee' : 'js';
  this.template('app.' + ext, 'app/scripts/main.' + ext);
};

