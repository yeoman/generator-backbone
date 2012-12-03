
var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman');

module.exports = Generator;

function Generator() {
  yeoman.generators.Base.apply(this, arguments);

  this.test_framework = this.options['test-framework'] || 'mocha';
  // this.hookFor('test-framework', { as: 'app' });
}

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.setupEnv = function setupEnv() {
   // Copies the contents of the generator `templates`
  // directory into your users new application path
  this.sourceRoot(path.join(__dirname, 'templates'));

  this.directory('app/scripts/','app/scripts/', true);
  this.directory('app/styles/','app/styles/', true);
  this.template('app/.buildignore');
  this.template('app/.htaccess');
  this.template('app/404.html');
  this.template('app/favicon.ico');
  this.template('app/robots.txt');
};

Generator.prototype.git = function git() {
  this.copy('.gitignore', '.gitignore');
  this.copy('.gitattributes', '.gitattributes');
};

Generator.prototype.gruntfile = function gruntfile() {
  if(this.test_framework === 'jasmine'){
    var jasmine_gruntfile = this.read('Gruntfile.js').replace(/mocha/g,'jasmine');
    this.write('Gruntfile.js', jasmine_gruntfile);
  }else{
    this.template('Gruntfile.js');
  }
};

Generator.prototype.bowerrc = function bowerrc() {
  this.copy('.bowerrc', '.bowerrc');
}

Generator.prototype.editorconfig = function editorconfig() {
  this.copy('.editorconfig', '.editorconfig');
}

Generator.prototype.jshintrc = function jshintrc() {
  this.copy('.jshintrc', '.jshintrc');
}

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
