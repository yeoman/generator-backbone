/*global describe:true, beforeEach:true, it:true */
'use strict';
var path    = require('path');
var helpers = require('yeoman-generator').test;
var assert  = require('assert');
var fs      = require('fs');

describe('backbone generator with appPath option', function () {
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
      ], ['temp'], {appPath: 'public'});
      this.backbone.app.options['skip-install'] = true;

      helpers.mockPrompt(this.backbone.app, {
        features: ['compassBootstrap']
      });

      var out = [
        '{',
        '  "generator-backbone": {',
        '    "appPath": "public",',
        '    "appName": "Temp"',
        '  }',
        '}'
      ];
      fs.writeFileSync('.yo-rc.json', out.join('\n'));

      done();
    }.bind(this));
  });

  describe('create expected files', function () {
    it('in path specified by --appPath', function (done) {
      var expected = [
        ['bower.json', /"name": "temp"/],
        ['package.json', /"name": "temp"/],
        ['Gruntfile.js', /app: 'public'/],
        'public/404.html',
        'public/favicon.ico',
        'public/robots.txt',
        'public/index.html',
        'public/.htaccess',
        '.gitignore',
        '.gitattributes',
        '.bowerrc',
        '.jshintrc',
        '.editorconfig',
        '.yo-rc.json',
        'public/scripts/main.js',
        'public/styles/main.scss'
      ];

      this.backbone.app.run({}, function () {
        helpers.assertFiles(expected);
        done();
      });
    });
  });

  describe('Backbone Model', function () {
    it('creates backbone model', function (done) {
      var model = helpers.createGenerator('backbone:model', ['../../model'], ['foo']);

      this.backbone.app.run({}, function () {
        model.run([], function () {
          helpers.assertFiles([
            ['public/scripts/models/foo.js', /Models.Foo = Backbone.Model.extend\(\{/]
          ]);
        });
        done();
      });
    });
  });

  describe('Backbone Collection', function () {
    it('creates backbone collection', function (done) {
      var collection = helpers.createGenerator('backbone:collection', ['../../collection'], ['foo']);

      this.backbone.app.run({}, function () {
        collection.run([], function () {
          helpers.assertFiles([
            ['public/scripts/collections/foo.js', /Collections.Foo = Backbone.Collection.extend\(\{/]
          ]);
        });
        done();
      });
    });
  });

  describe('Backbone Router', function () {
    it('creates backbone router', function (done) {
      var router = helpers.createGenerator('backbone:router', ['../../router'], ['foo']);

      this.backbone.app.run({}, function () {
        router.run([], function () {
          helpers.assertFiles([
            ['public/scripts/routes/foo.js', /Routers.Foo = Backbone.Router.extend\(\{/]
          ]);
        });
        done();
      });
    });
  });

  describe('Backbone View', function () {
    it('creates backbone view', function (done) {
      var view = helpers.createGenerator('backbone:view', ['../../view'], ['foo']);

      this.backbone.app.run({}, function () {
        view.run([], function () {
          helpers.assertFiles([
            ['public/scripts/views/foo.js', /Views.Foo = Backbone.View.extend\(\{(.|\n)*public\/scripts\/templates\/foo.ejs/],
            'public/scripts/templates/foo.ejs'
          ]);
        });
        done();
      });
    });
  });

});
