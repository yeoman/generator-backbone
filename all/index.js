var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');

var BackboneGenerator = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);

    this.argument('app_name', { type: String, required: false });
    this.appname = this.app_name || this.appname;
    this.appname = this._.classify(this.appname);

    this.env.options.appPath = this.options.appPath || 'app';
    this.config.set('appPath', this.env.options.appPath);

    this.dirs = 'models collections views routes helpers templates'.split(' ');

    this.option('coffee');

    this.args = [this.appname];

    this.option('coffee');
    this.env.options.appPath = this.options.appPath || 'app';
    this.config.set('appPath', this.env.options.appPath);

    this.args = ['application'];

    if (this.options.coffee) {
      this.args.push('--coffee');
    }

    this.option('requirejs');

    if (this.options.requirejs) {
      this.args.push('--requirejs');
    }

    if (this.options['template-framework']) {
      this.env.options['template-framework'] = this.options['template-framework'];
    }

    this.testFramework = this.options['test-framework'] || 'mocha';

    this.on('end', function () {
      if (/^.*test$/.test(process.cwd())) {
        process.chdir('..');
      }
      this.installDependencies({ skipInstall: this.options['skip-install'] });
    });
  },

  writing: {
    createDirLayout: function () {
      this.dirs.forEach(function (dir) {
        this.log.create('app/scripts/' + dir);
        this.mkdir(path.join('app/scripts', dir));
      }.bind(this));
    },

    composeSubGenerators: function () {
      this.composeWith('backbone:app', {arguments: this.args});
    }
  },

  install: function () {
    this.composeWith('backbone:router', {arguments: this.args});
    this.composeWith('backbone:view', {arguments: this.args});
    this.composeWith('backbone:model', {arguments: this.args});
    this.composeWith('backbone:collection', {arguments: this.args});
  }
});

module.exports = BackboneGenerator;
