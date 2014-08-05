'use strict';
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var backboneUtils = require('./util.js');

var ScriptBase = yeoman.generators.NamedBase.extend({
  constructor: function (name) {
    yeoman.generators.NamedBase.apply(this, arguments);

    this.appname = this.config.get('appName') || path.basename(process.cwd());
    this.env.options.appPath = this.config.get('appPath') || 'app';

    this.options.coffee = this.config.get('coffee') || false;

    if (typeof this.env.options.coffee === 'undefined') {
      this.env.options.coffee = this.options.coffee;
    }

    // check if --requirejs option provided or if require is setup
    if (typeof this.env.options.requirejs === 'undefined') {
      this.option('requirejs');

      this.options.requirejs = this.config.get('includeRequireJS') || false;

      this.env.options.requirejs = this.options.requirejs;
    }

    this._.mixin({ 'classify': backboneUtils.classify });
  },

  _addScriptToIndex: function (script) {
    try {
      var appPath = this.env.options.appPath;
      var fullPath = path.join(appPath, 'index.html');

      backboneUtils.rewriteFile({
        file: fullPath,
        needle: '<!-- endbuild -->',
        splicable: [
          '<script src="scripts/' + script + '.js"></script>'
        ]
      });
    } catch (e) {
      this.log('\n Unable to find ' + fullPath + '. Reference to ' + script + '.js ' + 'not added.\n');
    }
  },

  _setupSourceRootAndSuffix: function () {
    var sourceRoot = '/templates';
    this.scriptSuffix = '.js';

    if (this.env.options.coffee || this.options.coffee) {
      sourceRoot = '/templates/coffeescript';
      this.scriptSuffix = '.coffee';
    }

    if (this.env.options.requirejs || this.options.requirejs) {
      sourceRoot += '/requirejs';
    }

    this.sourceRoot(path.join(__dirname, sourceRoot));
  },

  _writeTemplate: function (source, destination, data) {
    this._setupSourceRootAndSuffix();
    var ext = this.scriptSuffix;
    this.template(source + ext, destination + ext, data);
  },

  _canGenerateTests: function () {
    return this.config.get('testFramework') === 'mocha' && !this.config.get('includeRequireJS');
  },

  _generateTest: function (type) {
    if (this._canGenerateTests()) {
      this.composeWith('backbone-mocha:' + type, { arguments: [this.name] }, {
        coffee: this.config.get('coffee'),
        ui: this.config.get('ui')
      });
    }
  }
});

module.exports = ScriptBase;
