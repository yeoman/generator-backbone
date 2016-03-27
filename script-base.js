'use strict';
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var pascalCase = require('pascal-case');
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
  },

  _addScriptToIndex: function (script) {
    try {
      var appPath = this.env.options.appPath;
      var fullPath = this.destinationPath(path.join(appPath, 'index.html'));

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

  _setupSuffix: function () {
    this.scriptSuffix = '.js';

    if (this.env.options.coffee || this.options.coffee) {
      this.scriptSuffix = '.coffee';
    }
  },

  _getTemplateName: function (source) {

    if (this.env.options.requirejs || this.options.requirejs) {
      source = 'requirejs_' + source;
    }

    return source;
  },

  _writeTemplate: function (source, destination, data) {

    this._setupSuffix();
    this.fs.copyTpl(
      this.templatePath(source + this.scriptSuffix),
      this.destinationPath(destination + this.scriptSuffix),
      data
    );
  },

  _canGenerateTests: function () {
    return this.config.get('testFramework') === 'mocha';
  },

  _getGenerateOptions: function (options) {
    options = options || {};
    options.appClassName = options.appClassName || pascalCase(this.appname);
    options.className = options.className || pascalCase(this.name);
    options.name = options.name || this.name;
    return options;
  },

  _generate: function (type, options, dest) {
    dest = dest || type + 's';
    this._writeTemplate(
      this._getTemplateName(type),
      path.join(this.env.options.appPath, 'scripts', dest, this.name),
      this._getGenerateOptions(options)
    );

    if (!this.options.requirejs) {
      this._addScriptToIndex(path.join(dest, this.name));
    }
  },

  _generateTest: function (type, options, dest) {
    if (this._canGenerateTests()) {
      dest = dest || type + 's';

      this._writeTemplate(
        path.join('test', this.config.get('testFramework'), this._getTemplateName(type)),
        path.join('test', 'spec', dest, this.name + '.spec'),
        this._getGenerateOptions(options)
      );
    }
  }
});

module.exports = ScriptBase;
