'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var scriptBase = require('../script-base');
var backboneUtils = require('../util.js');

var Generator = module.exports = function Generator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.argument('appname', { type: String, required: false });
  this.appname = this.appname || path.basename(process.cwd());
  this.appname = backboneUtils.classify(this.appname);

  this.env.options.appPath = this.options.appPath || 'app';
  this.config.set('appPath', this.env.options.appPath);

  this.testFramework = this.options['test-framework'] || 'mocha';
  this.templateFramework = this.options['template-framework'] || 'lodash';

  if (this.options.namespace === 'backbone:app') {
    this.hookFor(this.testFramework, {
      as: 'app',
      options: {
        'skip-install': this.options['skip-install'],
        'ui': this.options.ui
      }
    });
  }

  this.config.defaults({
    appName: this.appname,
    ui: this.options.ui,
    coffee: this.options.coffee,
    testFramework: this.testFramework,
    templateFramework: this.templateFramework,
    compassBootstrap: this.compassBootstrap,
    includeRequireJS: this.includeRequireJS
  });

  this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));

  this.on('end', function () {
    if (this.options.namespace === 'backbone:app') {
      if (/^.*test$/.test(process.cwd())) {
        process.chdir('..');
      }
      this.installDependencies({ skipInstall: this.options['skip-install'] });
    }
  });
};

util.inherits(Generator, scriptBase);

Generator.prototype.askFor = function askFor() {
  var cb = this.async();

  // welcome message
  console.log(this.yeoman);
  console.log('Out of the box I include HTML5 Boilerplate, jQuery, Backbone.js and Modernizr.');

  var prompts = [{
    type: 'checkbox',
    name: 'features',
    message: 'What more would you like?',
    choices: [{
      name: 'Bootstrap for Sass',
      value: 'compassBootstrap',
      checked: true
    }, {
      name: 'Use CoffeeScript',
      value: 'coffee',
      checked: this.options.coffee || false
    }, {
      name: 'Use RequireJs',
      value: 'requirejs',
      checked: this.options.requirejs || false
    }]
  }];

  this.prompt(prompts, function (answers) {
    var features = answers.features;

    function hasFeature(feat) { return features.indexOf(feat) !== -1; }

    // manually deal with the response, get back and store the results.
    // we change a bit this way of doing to automatically do this in the self.prompt() method.
    this.compassBootstrap = hasFeature('compassBootstrap');
    this.includeRequireJS = hasFeature('requirejs');
    this.config.set('compassBootstrap', this.compassBootstrap);


    if (!this.options.coffee) {
      this.options.coffee = hasFeature('coffee');
      this.config.set('coffee', this.options.coffee);
    }

    if (!this.options.requirejs) {
      this.options.requirejs = this.includeRequireJS;
      this.config.set('includeRequireJS', this.includeRequireJS);
    }
    cb();
  }.bind(this));
};

Generator.prototype.git = function git() {
  this.template('gitignore', '.gitignore');
  this.copy('gitattributes', '.gitattributes');
};

Generator.prototype.bower = function bower() {
  this.template('bowerrc', '.bowerrc');
  this.copy('_bower.json', 'bower.json');
};

Generator.prototype.jshint = function jshint() {
  this.copy('jshintrc', '.jshintrc');
};

Generator.prototype.editorConfig = function editorConfig() {
  this.copy('editorconfig', '.editorconfig');
};

Generator.prototype.gruntfile = function gruntfile() {
  this.template('Gruntfile.js');
};

Generator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

Generator.prototype.mainStylesheet = function mainStylesheet() {
  var contentText = [
    'body {\n    background: #fafafa;\n}',
    '\n.hero-unit {\n    margin: 50px auto 0 auto;\n    width: 300px;\n}'
  ];
  var ext = '.css';
  if (this.compassBootstrap) {
    this.template('main.scss', this.env.options.appPath + '/styles/main.scss');
  }
  this.write(this.env.options.appPath + '/styles/main' + ext, contentText.join('\n'));
};

Generator.prototype.writeIndex = function writeIndex() {
  if (this.includeRequireJS) {
    return;
  }

  this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));
  this.indexFile = this.engine(this.indexFile, this);

  var vendorJS = [
    'bower_components/jquery/dist/jquery.js',
    'bower_components/underscore/underscore.js',
    'bower_components/backbone/backbone.js'
  ];

  if (this.templateFramework === 'handlebars') {
    vendorJS.push('bower_components/handlebars/handlebars.js');
  }

  this.indexFile = this.appendScripts(this.indexFile, 'scripts/vendor.js', vendorJS);

  if (this.compassBootstrap) {
    // wire Bootstrap plugins
    this.indexFile = this.appendScripts(this.indexFile, 'scripts/plugins.js', [
      'bower_components/sass-bootstrap/js/affix.js',
      'bower_components/sass-bootstrap/js/alert.js',
      'bower_components/sass-bootstrap/js/dropdown.js',
      'bower_components/sass-bootstrap/js/tooltip.js',
      'bower_components/sass-bootstrap/js/modal.js',
      'bower_components/sass-bootstrap/js/transition.js',
      'bower_components/sass-bootstrap/js/button.js',
      'bower_components/sass-bootstrap/js/popover.js',
      'bower_components/sass-bootstrap/js/carousel.js',
      'bower_components/sass-bootstrap/js/scrollspy.js',
      'bower_components/sass-bootstrap/js/collapse.js',
      'bower_components/sass-bootstrap/js/tab.js'
    ]);
  }

  this.indexFile = this.appendFiles({
    html: this.indexFile,
    fileType: 'js',
    searchPath: ['.tmp', this.env.options.appPath],
    optimizedPath: 'scripts/main.js',
    sourceFileList: [
      'scripts/main.js',
      'scripts/templates.js'
    ]
  });
};

Generator.prototype.writeIndexWithRequirejs = function writeIndexWithRequirejs() {
  if (!this.includeRequireJS) {
    return;
  }
  this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));
  this.indexFile = this.engine(this.indexFile, this);

  this.indexFile = this.appendScripts(this.indexFile, 'scripts/main.js', [
    'bower_components/requirejs/require.js'
  ], {'data-main': 'scripts/main'});
};

Generator.prototype.setupEnv = function setupEnv() {
  this.mkdir(this.env.options.appPath);
  this.mkdir(this.env.options.appPath + '/scripts');
  this.mkdir(this.env.options.appPath + '/scripts/vendor/');
  this.mkdir(this.env.options.appPath + '/styles');
  this.mkdir(this.env.options.appPath + '/images');
  this.copy('app/404.html', this.env.options.appPath + '/404.html');
  this.copy('app/favicon.ico', this.env.options.appPath + '/favicon.ico');
  this.copy('app/robots.txt', this.env.options.appPath + '/robots.txt');
  this.copy('app/htaccess', this.env.options.appPath + '/.htaccess');
  this.write(this.env.options.appPath + '/index.html', this.indexFile);
};

Generator.prototype.mainJs = function mainJs() {
  if (!this.includeRequireJS) {
    return;
  }
  this.writeTemplate('main', this.env.options.appPath + '/scripts/main');
};

Generator.prototype.createAppFile = function createAppFile() {
  if (this.includeRequireJS) {
    return;
  }
  this.writeTemplate('app', this.env.options.appPath + '/scripts/main');
};
