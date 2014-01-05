'use strict';
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var backboneUtils = require('./util.js');

var Generator = module.exports = function Generator() {
  yeoman.generators.NamedBase.apply(this, arguments);

  try {
    this.appname = require(path.join(process.cwd(), 'bower.json')).name;
  }
  catch (e) {
    this.appname = path.basename(process.cwd());
  }
  this.appname = this._.slugify(this._.humanize(this.appname));

  this.env.options.appPath = this.config.get('appPath') || 'app';

  if (this.env.options.minsafe) {
    sourceRoot += '-min';
  }

  if (typeof this.env.options.coffee === 'undefined') {
    this.option('coffee');

    // attempt to detect if user is using CS or not
    // if cml arg provided, use that; else look for the existence of cs
    if (!this.options.coffee &&
      this.expandFiles(path.join(this.env.options.appPath, '/scripts/**/*.coffee'), {}).length > 0) {
      this.options.coffee = true;
    }

    this.env.options.coffee = this.options.coffee;
  }

  // check if --requirejs option provided or if require is setup
  if (typeof this.env.options.requirejs === 'undefined') {
    this.option('requirejs');

    this.options.requirejs = this.checkIfUsingRequireJS();

    this.env.options.requirejs = this.options.requirejs;
  }

  this.setupSourceRootAndSuffix();
};

util.inherits(Generator, yeoman.generators.NamedBase);


Generator.prototype.addScriptToIndex = function (script) {
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
    console.log('\nUnable to find '.yellow + fullPath + '. Reference to '.yellow + script + '.js ' + 'not added.\n'.yellow);
  }
};

/*
 * Check whether the App is a RequireJS app or not
 *
 * @return boolean
 */
Generator.prototype.checkIfUsingRequireJS = function checkIfUsingRequireJS() {
  if (typeof this.env.options.requirejs !== 'undefined') {
    return this.env.options.requirejs;
  }

  var ext = this.env.options.coffee ? '.coffee' : '.js';
  var filepath = path.join(process.cwd(), 'app/scripts/main' + ext);

  try {
    this.env.options.requirejs = (/require\.config/).test(this.read(filepath));
    return this.env.options.requirejs;
  } catch (e) {
    return false;
  }
};

Generator.prototype.getTemplateFramework = function getTemplateFramework() {
  if (!(require('fs').existsSync(path.join(process.cwd(), 'Gruntfile.js')))) {
    return 'lodash';
  }
  var ftest = (/templateFramework: '([^\']*)'/);
  var match = ftest.exec(this.read(path.join(process.cwd(), 'Gruntfile.js')));
  if (match) {
    return match[1];
  } else {
    return 'lodash';
  }
};

Generator.prototype.setupSourceRootAndSuffix = function setupSourceRootAndSuffix() {
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
};

Generator.prototype.writeTemplate = function writeTemplate(source, destination, data) {
  this.setupSourceRootAndSuffix();
  var ext = this.scriptSuffix;
  this.template(source + ext, destination + ext, data);
};

Generator.prototype.geneateTests = function geneateTests(){
  return this.config.get('testFramework') == 'mocha' && !this.config.get('includeRequireJS')
}
