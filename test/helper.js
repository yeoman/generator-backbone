var yeoman  = require('yeoman-generator');
var helpers = yeoman.test;
var path    = require('path');

exports.createSubGenerator = function (type, asserts, name) {
  name = name || (name = 'foo');
  var deps = [
    [helpers.createDummyGenerator(), 'backbone-mocha:' + type]
  ];
  helpers.run(path.join(__dirname, '../' + type))
    .withArguments([name])
    .withGenerators(deps)
    .on('end', asserts);
};

exports.createAppGenerator = function (args, options) {
  var app = helpers.createGenerator('backbone:app', [
    '../../app', [
      helpers.createDummyGenerator(),
      'mocha:app'
    ]
  ], args, options);
  app.options['skip-install'] = true;
  return app;
};
