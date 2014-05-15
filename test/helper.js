var yeoman  = require('yeoman-generator');
var helpers = yeoman.test;

exports.createSubGenerator = function (type, asserts) {
  var subGenerator = helpers.createGenerator('backbone:' + type, [
    '../../' + type, [
      helpers.createDummyGenerator(),
      'backbone-mocha:' + type
    ]
  ], ['foo']);

  subGenerator.run([], function () {
    asserts();
  });
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
