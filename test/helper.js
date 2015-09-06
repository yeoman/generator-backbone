var yeoman  = require('yeoman-generator');
var helpers = yeoman.test;
var path    = require('path');
var fs      = require('fs');

exports.createSubGenerator = function (config, type, asserts) {
  var deps = [
    [helpers.createDummyGenerator(), 'backbone-mocha:' + type]
  ];
  helpers.run(path.join(__dirname, '../generators/' + type))
    .inDir(path.join(__dirname, 'temp'), function () {
      fs.writeFileSync('.yo-rc.json', config);
    })
    .withArguments(['foo'])
    .withGenerators(deps)
    .on('end', asserts);
};

exports.createAppGenerator = function (config, prompts, done) {

  prompts = prompts || { features: ['sassBootstrap']};

  var options = { skipInstall: true };

  var deps = [
    [helpers.createDummyGenerator(), 'mocha:app']
  ];
  helpers.run(path.join(__dirname, '../generators/app'))
    .inDir(path.join(__dirname, 'temp'), function () {
      fs.writeFileSync('.yo-rc.json', config);
    })
    .withPrompts(prompts)
    .withOptions(options)
    .withGenerators(deps)
    .on('end', done);
};
