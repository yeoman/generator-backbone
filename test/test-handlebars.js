/*global describe:true, beforeEach:true, it:true */
'use strict';
var path    = require('path');
var helpers = require('yeoman-generator').test;
var assert  = require('assert');
var fs      = require('fs');

describe('Backbone generator with handlebars', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, './temp'), function (err) {
      if (err) {
        return done(err);
      }
      this.backbone = {};
      this.backbone.app = helpers.createGenerator('backbone:app', [
        '../../app', [
          helpers.createDummyGenerator(),
          'mocha:app'
        ]
      ], ['temp'], {'template-framework': 'handlebars'});
      this.backbone.app.options['skip-install'] = true;

      helpers.mockPrompt(this.backbone.app, {
        features: ['compassBootstrap'],
        includeRequireJS: false
      });

      var out = [
        '{',
        '  "generator-backbone": {',
        '    "appPath": "app"',
        '  }',
        '}'
      ];
      fs.writeFileSync('.yo-rc.json', out.join('\n'));

      done();
    }.bind(this));

  });

  describe('Backbone View', function () {
    it('creates backbone view', function (done) {
      var view = helpers.createGenerator('backbone:view', ['../../view'], ['foo']);

      this.backbone.app.run({}, function () {
        view.run([], function () {
          helpers.assertFiles([
            ['app/scripts/views/foo.js', /Views.FooView = Backbone.View.extend\(\{(.|\n)*app\/scripts\/templates\/foo.hbs/],
            'app/scripts/templates/foo.hbs'
          ]);
        });
        done();
      });
    });
  });
});
