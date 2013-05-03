var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


module.exports = Generator;

function Generator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.testFramework = this.options['test-framework'] || 'mocha';
  this.templateFramework = this.options['template-framework'] || 'lodash';
  this.hookFor(this.testFramework, { as: 'app' });

  this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));

  this.on('end', function () {
    if (['app', 'backbone'].indexOf(this.generatorName) >= 0) {
      this.installDependencies({ skipInstall: this.options['skip-install'] });
    }
  });
}

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.askFor = function askFor() {
  var cb = this.async();

  // welcome message
  var welcome =
  '\n     _-----_' +
  '\n    |       |' +
  '\n    |'+'--(o)--'.red+'|   .--------------------------.' +
  '\n   `---------´  |    '+'Welcome to Yeoman,'.yellow.bold+'    |' +
  '\n    '+'( '.yellow+'_'+'´U`'.yellow+'_'+' )'.yellow+'   |   '+'ladies and gentlemen!'.yellow.bold+'  |' +
  '\n    /___A___\\   \'__________________________\'' +
  '\n     |  ~  |'.yellow +
  '\n   __'+'\'.___.\''.yellow+'__' +
  '\n ´   '+'`  |'.red+'° '+'´ Y'.red+' `\n';

  console.log(welcome);
  console.log('Out of the box I include HTML5 Boilerplate, jQuery, Backbone.js and Modernizr.');

  var prompts = [{
    name: 'compassBootstrap',
    message: 'Would you like to include Twitter Bootstrap for Sass?',
    default: 'Y/n',
    warning: 'Yes: All Twitter Bootstrap files will be placed into the styles directory.'
  },
  {
    name: 'includeRequireJS',
    message: 'Would you like to include RequireJS (for AMD support)?',
    default: 'Y/n',
    warning: 'Yes: RequireJS will be placed into the JavaScript vendor directory.'
  }];

  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

    // manually deal with the response, get back and store the results.
    // we change a bit this way of doing to automatically do this in the self.prompt() method.
    this.compassBootstrap = (/y/i).test(props.compassBootstrap);
    this.includeRequireJS = (/y/i).test(props.includeRequireJS);

    cb();
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
  if (this.testFramework === 'jasmine') {
    this.write('Gruntfile.js', this.engine(this.read('Gruntfile.js'), this).replace(/mocha/g, 'jasmine'));
  } else {
    this.template('Gruntfile.js');
  }
};

Generator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

Generator.prototype.mainStylesheet = function mainStylesheet() {
  if (this.compassBootstrap) {
    this.write('app/styles/main.scss', '@import \'sass-bootstrap/lib/bootstrap\';\n\n.hero-unit {\n    margin: 50px auto 0 auto;\n    width: 300px;\n}');
  } else {
    this.write('app/styles/main.css', 'body {\n    background: #fafafa;\n}\n\n.hero-unit {\n    margin: 50px auto 0 auto;\n    width: 300px;\n}');
  }
};

Generator.prototype.writeIndex = function writeIndex() {
  if (this.includeRequireJS) {
    return;
  }

  // prepare default content text
  var defaults = ['HTML5 Boilerplate', 'jQuery', 'Backbone.js', 'Underscore.js'];
  var contentText = [
    '        <div class="container">',
    '            <div class="hero-unit">',
    '                <h1>\'Allo, \'Allo!</h1>',
    '                <p>You now have</p>',
    '                <ul>'
  ];

  this.indexFile = this.appendScripts(this.indexFile, 'scripts/vendor.js', [
    'bower_components/jquery/jquery.min.js',
    'bower_components/underscore/underscore-min.js',
    'bower_components/backbone/backbone-min.js'
  ]);

  if (this.compassBootstrap) {
    // wire Twitter Bootstrap plugins
    this.indexFile = this.appendScripts(this.indexFile, 'scripts/plugins.js', [
      'bower_components/sass-bootstrap/js/bootstrap-affix.js',
      'bower_components/sass-bootstrap/js/bootstrap-alert.js',
      'bower_components/sass-bootstrap/js/bootstrap-dropdown.js',
      'bower_components/sass-bootstrap/js/bootstrap-tooltip.js',
      'bower_components/sass-bootstrap/js/bootstrap-modal.js',
      'bower_components/sass-bootstrap/js/bootstrap-transition.js',
      'bower_components/sass-bootstrap/js/bootstrap-button.js',
      'bower_components/sass-bootstrap/js/bootstrap-popover.js',
      'bower_components/sass-bootstrap/js/bootstrap-typeahead.js',
      'bower_components/sass-bootstrap/js/bootstrap-carousel.js',
      'bower_components/sass-bootstrap/js/bootstrap-scrollspy.js',
      'bower_components/sass-bootstrap/js/bootstrap-collapse.js',
      'bower_components/sass-bootstrap/js/bootstrap-tab.js'
    ]);

    contentText.push('                    <li>Twitter Bootstrap</li>');
  }

  this.indexFile = this.appendScripts(this.indexFile, 'scripts/main.js', [
    'scripts/main.js',
    'scripts/templates.js'
  ]);

  // iterate over defaults and create content string
  defaults.forEach(function (el) {
    contentText.push('                    <li>' + el  +'</li>');
  });

  contentText = contentText.concat([
    '                </ul>',
    '                <p>installed.</p>',
    '                <h3>Enjoy coding! - Yeoman</h3>',
    '            </div>',
    '        </div>',
    ''
  ]);

  // append the default content
  this.indexFile = this.indexFile.replace('<body>', '<body>\n' + contentText.join('\n'));
};

Generator.prototype.bootstrapJs = function bootstrapJs() {
  // TODO: create a Bower component for this
  if (this.includeRequireJS && this.compassBootstrap) {
    this.copy('bootstrap.js', 'app/scripts/vendor/bootstrap.js');
  }
};

Generator.prototype.writeIndexWithRequirejs = function writeIndexWithRequirejs(){
  if (!this.includeRequireJS) {
    return;
  }

  // prepare default content text
  var defaults = ['HTML5 Boilerplate', 'jQuery', 'Backbone.js', 'Underscore.js', 'RequireJS'];
  var contentText = [
    '        <div class="container">',
    '            <div class="hero-unit">',
    '                <h1>\'Allo, \'Allo!</h1>',
    '                <p>You now have</p>',
    '                <ul>'
  ];

  if (this.compassBootstrap) {
    defaults.push('Twitter Bootstrap');
  }

  this.indexFile = this.appendScripts(this.indexFile, 'scripts/main.js', [
    'bower_components/requirejs/require.js',
  ], {'data-main': 'scripts/main'});

    // iterate over defaults and create content string
  defaults.forEach(function (el) {
    contentText.push('                    <li>' + el  + '</li>');
  });

  contentText = contentText.concat([
    '                </ul>',
    '                <p>installed.</p>',
    '                <h3>Enjoy coding! - Yeoman</h3>',
    '            </div>',
    '        </div>',
    ''
  ]);

  // append the default content
  this.indexFile = this.indexFile.replace('<body>', '<body>\n' + contentText.join('\n'));
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

  var mainJsFile = [
    '/*global require*/',
    '\'use strict\';',
    '',
    'require.config({',
    '    shim: {',
    '        underscore: {',
    '            exports: \'_\'',
    '        },',
    '        backbone: {',
    '            deps: [',
    '                \'underscore\',',
    '                \'jquery\'',
    '            ],',
    '            exports: \'Backbone\'',
    '        },',
  ];

  if (this.compassBootstrap) {
    mainJsFile.push(
      '        bootstrap: {',
      '            deps: [\'jquery\'],',
      '            exports: \'jquery\'',
      '        }'
    );
  }

  mainJsFile.push(
    '    },',
    '    paths: {',
    '        jquery: \'../bower_components/jquery/jquery\',',
    '        backbone: \'../bower_components/backbone-amd/backbone\',',
    '        underscore: \'../bower_components/underscore-amd/underscore\','
  );

  if (this.compassBootstrap) {
    mainJsFile.push('        bootstrap: \'vendor/bootstrap\'');
  }

  mainJsFile.push(
    '    }',
    '});'
  );

  mainJsFile.push(
    '',
    'require([',
    '    \'backbone\'',
    '], function (Backbone) {',
    '    Backbone.history.start();',
    '});'
  );

  this.write('app/scripts/main.js', mainJsFile.join('\n'));
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
