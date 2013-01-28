
var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generators');

module.exports = Generator;

function Generator() {
  yeoman.generators.Base.apply(this, arguments);

  this.test_framework = this.options['test-framework'] || 'mocha';
  this.hookFor('test-framework', { as: 'app' });
}

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.setupEnv = function setupEnv() {
  this.mkdir('app');
  this.mkdir('app/scripts');
  this.mkdir('app/styles');
  this.mkdir('app/images');
  this.template('app/404.html');
  this.template('app/favicon.ico');
  this.template('app/robots.txt');
  this.copy('app/htaccess', 'app/.htaccess');
};

Generator.prototype.git = function git() {
  this.copy('gitignore', '.gitignore');
  this.copy('gitattributes', '.gitattributes');
};

AppGenerator.prototype.bower = function bower() {
  this.copy('bowerrc', '.bowerrc');
  this.copy('component.json', 'component.json');
  this.install('', function (err) {
    if (err) {
      console.error(err);
    }
  });
};

AppGenerator.prototype.jshint = function jshint() {
  this.copy('jshintrc', '.jshintrc');
};

AppGenerator.prototype.editorConfig = function editorConfig() {
  this.copy('editorconfig', '.editorconfig');
};

Generator.prototype.gruntfile = function gruntfile() {
  if(this.test_framework === 'jasmine'){
    var jasmine_gruntfile = this.read('Gruntfile.js').replace(/mocha/g,'jasmine');
    this.write('Gruntfile.js', jasmine_gruntfile);
  }else{
    this.template('Gruntfile.js');
  }
};

Generator.prototype.packageJSON = function packageJSON() {
  this.template('package.json');
};

Generator.prototype.indexFile = function indexFile(){
  if(this.test_framework === 'jasmine'){
    var jasmine_indexfile = this.read('app/index.html').replace(/mocha/gi, 'Jasmine');
    this.write('app/index.html', jasmine_indexfile,true);
  }else{
    this.template('app/index.html');
  }
};
