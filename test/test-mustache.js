/*global describe:true, beforeEach:true, it:true */
'use strict';
var path    = require('path');
var yeoman  = require('yeoman-generator');
var helpers = yeoman.test;
var assert  = yeoman.assert;
var fs      = require('fs');
var test    = require('./helper.js');

describe('Backbone generator with mustache', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, './temp'), function (err) {
      if (err) {
        return done(err);
      }
      this.backbone = {};
      this.backbone.app = test.createAppGenerator(['temp'], {'template-framework': 'mustache'});

      helpers.mockPrompt(this.backbone.app, {
        features: ['compassBootstrap'],
        includeRequireJS: false
      });

      var out = [
        '{',
        '  "generator-backbone": {',
        '    "appPath": "app",',
        '    "appName": "Temp",',
        '    "templateFramework": "mustache"',
        '  }',
        '}'
      ];
      fs.writeFileSync('.yo-rc.json', out.join('\n'));

      done();
    }.bind(this));

  });

  it('creates backbone view', function (done) {

    this.backbone.app.run({}, function () {
      test.createSubGenerator('view', function () {
        assert.fileContent(
          'app/scripts/views/foo.js', /Views.Foo = Backbone.View.extend\(\{(.|\n)*foo-template/
        );
        assert.file('app/scripts/templates/foo-template.mustache');
        done();
      });
    });
  });
});
