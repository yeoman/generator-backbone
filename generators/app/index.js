'use strict';
var util = require('util');
var path = require('path');
var ejs = require('ejs');
var htmlWiring = require('html-wiring');
var mkdirp = require('mkdirp');
var pascalCase = require('pascal-case');
var paramCase = require('param-case');
var yeoman = require('yeoman-generator');

var BackboneGenerator = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);

    this.option('appPath', {
      desc: 'Name of application directory',
      type: 'String',
      defaults: 'app',
      banner: 'some banner'
    });

    this.option('requirejs', {
      desc: 'Support requirejs',
      defaults: false
    });

    this.option('template-framework', {
      desc: 'Choose template framework. lodash/handlebars/mustache',
      type: 'String',
      defaults: 'lodash'
    });

    this.option('test-framework', {
      desc: 'Choose test framework. mocha/jasmine',
      type: 'String',
      defaults: 'mocha'
    });

    this.option('skip-install', {
      desc: 'Skip the bower and node installations',
      defaults: false
    });

    this.argument('app_name', { type: String, required: false });
    this.appname = this.app_name || this.appname;
    this.appname = pascalCase(this.appname);

    this.env.options.appPath = this.options.appPath || 'app';
    this.config.set('appPath', this.env.options.appPath);

    this.testFramework = this.options['test-framework'] || 'mocha';
    this.templateFramework = this.options['template-framework'] || 'lodash';

    this.config.defaults({
      appName: this.appname,
      ui: this.options.ui,
      coffee: this.options.coffee,
      testFramework: this.testFramework,
      templateFramework: this.templateFramework,
      sassBootstrap: this.sassBootstrap,
      includeRequireJS: this.options.requirejs
    });

    this.indexFile = htmlWiring.readFileAsString(this.templatePath('index.html'));
  },

  prompting: function () {
    var cb = this.async();

    // welcome message
    this.log(this.yeoman);
    this.log('Out of the box I include HTML5 Boilerplate, jQuery and Backbone.js.');

    var prompts = [{
      type: 'checkbox',
      name: 'features',
      message: 'What more would you like?',
      choices: [{
        name: 'Twitter Bootstrap for Sass',
        value: 'sassBootstrap',
        checked: true
      }, {
        name: 'Use CoffeeScript',
        value: 'coffee',
        checked: this.options.coffee || false
      }, {
        name: 'Use RequireJS',
        value: 'requirejs',
        checked: this.options.requirejs || false
      }, {
        name: 'Use Modernizr',
        value: 'modernizr',
        checked: false
      }]
    }];

    this.prompt(prompts, function (answers) {
      var features = answers.features;

      function hasFeature(feat) { return features.indexOf(feat) !== -1; }

      // manually deal with the response, get back and store the results.
      // we change a bit this way of doing to automatically do this in the self.prompt() method.
      this.sassBootstrap = hasFeature('sassBootstrap');
      this.includeRequireJS = hasFeature('requirejs');
      this.includeModernizr = hasFeature('modernizr');
      this.config.set('sassBootstrap', this.sassBootstrap);


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
  },

  writing: {

    git: function () {
      this.fs.copyTpl(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore'),
        {
          appPath: this.env.options.appPath
        }
      );
      this.fs.copyTpl(
        this.templatePath('gitattributes'),
        this.destinationPath('.gitattributes')
      );
    },

    bower: function () {
      this.fs.copyTpl(
        this.templatePath('bowerrc'),
        this.destinationPath('.bowerrc'),
        {
          appPath: this.env.options.appPath
        }
      );
      this.fs.copyTpl(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json'),
        {
          appParamCaseName: paramCase(this.appname),
          sassBootstrap: this.sassBootstrap,
          includeRequireJS: this.includeRequireJS,
          includeModernizr: this.includeModernizr,
          templateFramework: this.templateFramework
        }
      );
    },

    jshint: function () {
      this.fs.copyTpl(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc'),
        {
          appName: this.appname,
          appPascalCaseName: pascalCase(this.appname),
          includeRequireJS: this.includeRequireJS
        }
      );
    },

    editorConfig: function () {
      this.fs.copyTpl(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
    },

    gruntfile: function () {
      this.fs.copyTpl(
        this.templatePath('Gruntfile.js'),
        this.destinationPath('Gruntfile.js'),
        {
          appPath: this.env.options.appPath,
          hasCoffee: this.options.coffee,
          includeRequireJS: this.includeRequireJS,
          sassBootstrap: this.sassBootstrap,
          templateFramework: this.templateFramework,
          testFramework: this.testFramework
        }
      );
    },

    packageJSON: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        {
          hasCoffee: this.options.coffee,
          includeRequireJS: this.includeRequireJS,
          sassBootstrap: this.sassBootstrap,
          templateFramework: this.templateFramework,
          testFramework: this.testFramework
        }
      );
    },

    mainStylesheet: function () {
      var contentText = [
        'body {\n    background: #fafafa;\n}',
        '\n.hero-unit {\n    margin: 50px auto 0 auto;\n    width: 300px;\n}'
      ];
      var ext = '.css';
      if (this.sassBootstrap) {
        this.fs.copyTpl(
          this.templatePath('main.scss'),
          this.destinationPath(this.env.options.appPath + '/styles/main.scss')
        );
        return;
      }
      this.fs.write(
        this.destinationPath(this.env.options.appPath + '/styles/main' + ext),
        contentText.join('\n')
      );
    },

    writeIndex: function () {
      if (this.includeRequireJS) {
        return;
      }

      this.indexFile = htmlWiring.readFileAsString(this.templatePath('index.html'));
      this.indexFile = ejs.render(
        this.indexFile,
        {
          appName: this.appname,
          includeModernizr: this.includeModernizr,
          includeRequireJS: this.includeRequireJS,
          sassBootstrap: this.sassBootstrap
        }
      );

      var vendorJS = [
        'bower_components/jquery/dist/jquery.js',
        'bower_components/lodash/dist/lodash.compat.js',
        'bower_components/backbone/backbone.js'
      ];

      if (this.templateFramework === 'handlebars') {
        vendorJS.push('bower_components/handlebars/handlebars.js');
      }

      this.indexFile = htmlWiring.appendScripts(this.indexFile, 'scripts/vendor.js', vendorJS);

      if (this.sassBootstrap) {
        // wire Twitter Bootstrap plugins
        this.indexFile = htmlWiring.appendScripts(this.indexFile, 'scripts/plugins.js', [
          'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/affix.js',
          'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/alert.js',
          'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/button.js',
          'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/carousel.js',
          'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/collapse.js',
          'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/dropdown.js',
          'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/modal.js',
          'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tooltip.js',
          'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/popover.js',
          'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/scrollspy.js',
          'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tab.js',
          'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/transition.js'
        ]);
      }

      this.indexFile = htmlWiring.appendFiles({
        html: this.indexFile,
        fileType: 'js',
        searchPath: ['.tmp', this.env.options.appPath],
        optimizedPath: 'scripts/main.js',
        sourceFileList: [
          'scripts/main.js',
          'scripts/templates.js'
        ]
      });
    },

    writeIndexWithRequirejs: function () {
      if (!this.includeRequireJS) {
        return;
      }
      this.indexFile = htmlWiring.readFileAsString(this.templatePath('index.html'));
      this.indexFile = ejs.render(
        this.indexFile,
        {
          appName: this.appname,
          includeModernizr: this.includeModernizr,
          includeRequireJS: this.includeRequireJS,
          sassBootstrap: this.sassBootstrap
        }
      );
    },

    setupEnv: function () {
      mkdirp.sync(
        this.templatePath(this.env.options.appPath)
      );
      mkdirp.sync(
        this.templatePath(this.env.options.appPath + '/scripts')
      );
      mkdirp.sync(
        this.templatePath(this.env.options.appPath + '/scripts/vendor/')
      );
      mkdirp.sync(
        this.templatePath(this.env.options.appPath + '/styles')
      );
      mkdirp.sync(
        this.templatePath(this.env.options.appPath + '/images')
      );
      this.fs.copyTpl(
        this.templatePath('app/404.html'),
        this.destinationPath(this.env.options.appPath + '/404.html')
      );
      this.fs.copyTpl(
        this.templatePath('app/favicon.ico'),
        this.destinationPath(this.env.options.appPath + '/favicon.ico')
      );
      this.fs.copyTpl(
        this.templatePath('app/robots.txt'),
        this.destinationPath(this.env.options.appPath + '/robots.txt')
      );
      this.fs.write(
        this.destinationPath(path.join(this.env.options.appPath, '/index.html')),
        this.indexFile
      );
    },

    createRequireJsAppFile: function () {
      if (!this.includeRequireJS) {
        return;
      }
      this._writeTemplate(
        'requirejs_app',
        this.env.options.appPath + '/scripts/main',
        {
          sassBootstrap: this.sassBootstrap,
          templateFramework: this.templateFramework
        }
      );
    },

    createAppFile: function () {
      if (this.includeRequireJS) {
        return;
      }
      this._writeTemplate(
        'app',
        this.env.options.appPath + '/scripts/main',
        {
          appPascalCaseName: pascalCase(this.appname)
        }
      );
    },

    composeTest: function () {
      if (['backbone:app', 'backbone'].indexOf(this.options.namespace) >= 0) {
        this.composeWith(this.testFramework, {
          'skip-install': this.options['skip-install'],
          'ui': this.options.ui,
          'skipMessage': true,
        });
      }
    }
  },

  setSuffix: function () {
    this.scriptSuffix = '.js';

    if (this.env.options.coffee || this.options.coffee) {
      this.scriptSuffix = '.coffee';
    }
  },

  _writeTemplate: function (source, destination, data) {
    if (typeof source === 'undefined' || typeof destination === 'undefined') {
      return;
    }

    if (typeof this.scriptSuffix === 'undefined') {
      this.setSuffix();
    }

    var ext = this.scriptSuffix;
    this.fs.copyTpl(
      this.templatePath(source + ext),
      this.destinationPath(destination + ext),
      data
    );
  },

  install: function () {
    var shouldInstall = !this.options['skip-install'];
    var isInstallable = ['backbone:app', 'backbone'].indexOf(this.options.namespace) > -1;
    if (shouldInstall && isInstallable) {
      this.npmInstall();
      this.bowerInstall('', {
        'config.cwd': this.destinationPath('.'),
        'config.directory': path.join(this.config.get('appPath'), 'bower_components')
      });
    }
  }
});

module.exports = BackboneGenerator;
