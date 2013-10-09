var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var Generator = module.exports = function Generator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.testFramework = this.options['test-framework'] || 'mocha';
  this.templateFramework = this.options['template-framework'] || 'lodash';
  this.hookFor(this.testFramework, {
    as: 'app',
    options: {
      options: {
        'skip-install': this.options['skip-install']
      }
    }
  });

  this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));

  this.on('end', function () {
    if (['app', 'backbone'].indexOf(this.generatorName) >= 0) {
      this.installDependencies({ skipInstall: this.options['skip-install'] });
    }
  });
};

util.inherits(Generator, yeoman.generators.Base);

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
      name: 'Twitter Bootstrap for Sass',
      value: 'compassBootstrap',
      checked: true
    }]
  }];

  if (!this.options.coffee) {
    prompts[0].choices.push({
      name: 'Use CoffeeScript',
      value: 'coffee',
      checked: false
    });
  }

  this.prompt(prompts, function (answers) {
    var features = answers.features;

    function hasFeature(feat) { return features.indexOf(feat) !== -1; }

    // manually deal with the response, get back and store the results.
    // we change a bit this way of doing to automatically do this in the self.prompt() method.
    this.compassBootstrap = hasFeature('compassBootstrap');

    if (!this.options.coffee) {
      this.options.coffee = hasFeature('coffee');
    }

    if (!this.options.coffee) {
      this.prompt([{
        type: 'confirm',
        name: 'includeRequireJS',
        message: 'Add RequireJS?'
      }], function (answers) {
        this.includeRequireJS = answers.includeRequireJS;

        cb();
      }.bind(this));
    } else {
      this.includeRequireJS = false;
      cb();
    }
  }.bind(this));
};

Generator.prototype.git = function git() {
  this.copy('gitignore', '.gitignore');
  this.copy('gitattributes', '.gitattributes');
};

Generator.prototype.bower = function bower() {
  this.copy('bowerrc', '.bowerrc');
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
    this.template('main.scss', 'app/styles/main.scss');
  }
  this.write('app/styles/main' + ext, contentText.join('\n'));
};

Generator.prototype.writeIndex = function writeIndex() {
  if (this.includeRequireJS) {
    return;
  }

  this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));
  this.indexFile = this.engine(this.indexFile, this);

  var vendorJS = [
    'bower_components/jquery/jquery.js',
    'bower_components/underscore/underscore.js',
    'bower_components/backbone/backbone.js'
  ];

  if (this.templateFramework === 'handlebars') {
    vendorJS.push('bower_components/handlebars/handlebars.js');
  }

  this.indexFile = this.appendScripts(this.indexFile, 'scripts/vendor.js', vendorJS);

  if (this.compassBootstrap) {
    // wire Twitter Bootstrap plugins
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
    searchPath: ['.tmp', 'app'],
    optimizedPath: 'scripts/main.js',
    sourceFileList: [
      'scripts/main.js',
      'scripts/templates.js'
    ]
  });
};

Generator.prototype.bootstrapJs = function bootstrapJs() {
  // TODO: create a Bower component for this
  if (this.includeRequireJS && this.compassBootstrap) {
    this.copy('bootstrap.js', 'app/scripts/vendor/bootstrap.js');
  }
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
  this.mkdir('app');
  this.mkdir('app/scripts');
  this.mkdir('app/scripts/vendor/');
  this.mkdir('app/styles');
  this.mkdir('app/images');
  this.template('app/404.html');
  this.template('app/favicon.ico');
  this.template('app/robots.txt');
  this.copy('app/htaccess', 'app/.htaccess');
  this.write('app/index.html', this.indexFile);
};

Generator.prototype.mainJs = function mainJs() {
  if (!this.includeRequireJS) {
    return;
  }

  var dirPath = this.options.coffee ? '../templates/coffeescript/' : '../templates';
  this.sourceRoot(path.join(__dirname, dirPath));

  var mainJsFile = this.engine(this.read('requirejs_app.js'), this);

  this.write('app/scripts/main.js', mainJsFile);
};

Generator.prototype.createAppFile = function createAppFile() {
  if (this.includeRequireJS) {
    return;
  }
  var dirPath = this.options.coffee ? '../templates/coffeescript/' : '../templates';
  this.sourceRoot(path.join(__dirname, dirPath));

  var ext = this.options.coffee ? 'coffee' : 'js';
  this.template('app.' + ext, 'app/scripts/main.' + ext);
};
