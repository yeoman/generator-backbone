var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');

module.exports = Generator;

function Generator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.dirs = 'models collections views routes helpers templates'.split(' ');

  this.option('coffee');
  this.env.options.appPath = this.options.appPath || 'app';
  this.config.set('appPath', this.env.options.appPath);

  args = ['application'];

  if (this.options.coffee) {
    args.push('--coffee');
  }

  this.option('requirejs');

  if (this.options.requirejs) {
    args.push('--requirejs');
  }

  if (this.options['template-framework']) {
    this.env.options['template-framework'] = this.options['template-framework'];
  }

  this.testFramework = this.options['test-framework'] || 'mocha';

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

  this.hookFor(this.testFramework, {
    as: 'app',
    options: {
      options: {
        'skip-install': this.options['skip-install']
      }
    }
  });

  this.on('end', function () {
    if (/^.*test$/.test(process.cwd())) {
      process.chdir('..');
    }
    this.installDependencies({ skipInstall: this.options['skip-install'] });
  });
}

util.inherits(Generator, yeoman.generators.Base);


Generator.prototype.createDirLayout = function createDirLayout() {
  this.dirs.forEach(function (dir) {
    this.log.create('app/scripts/' + dir);
    this.mkdir(path.join('app/scripts', dir));
  }.bind(this));
};
