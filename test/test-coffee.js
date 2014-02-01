/*global describe:true, beforeEach:true, it:true */
'use strict';
var path    = require('path');
var helpers = require('yeoman-generator').test;
var assert  = require('assert');
var fs      = require('fs');

describe('Backbone generator test with --coffee option', function () {
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
      ]);
      this.backbone.app.options['skip-install'] = true;

      helpers.mockPrompt(this.backbone.app, {
        features: ['compassBootstrap', 'coffee']
      });

      var out = [
        '{',
        '  "generator-backbone": {',
        '    "appPath": "app",',
        '    "appName": "Temp"',
        '  }',
        '}'
      ];
      fs.writeFileSync('.yo-rc.json', out.join('\n'));

      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      ['bower.json', /"name": "temp"/],
      ['package.json', /"name": "temp"/],
      'Gruntfile.js',
      'app/404.html',
      'app/favicon.ico',
      'app/robots.txt',
      'app/index.html',
      'app/.htaccess',
      '.gitignore',
      '.gitattributes',
      '.bowerrc',
      '.jshintrc',
      '.editorconfig',
      '.yo-rc.json',
      'app/scripts/main.coffee'
    ];

    this.backbone.app.run([], function () {
      helpers.assertFiles(expected);
      done();
    });

  });

  describe('Backbone Model in coffeescript', function () {
    it('creates backbone model', function (done) {
      var model = helpers.createGenerator('backbone:model', ['../../model'], ['foo']);

      this.backbone.app.run([], function () {
        var model = helpers.createGenerator('backbone:model', [
          '../../model', [
            helpers.createDummyGenerator(),
            'backbone-mocha:model'
          ]
        ], ['foo']);

        model.run([], function () {
          helpers.assertFiles([
            ['app/scripts/models/foo.coffee', /class Temp.Models.Foo extends Backbone.Model/]
          ]);
        });
        done();
      });
    });
  });

  describe('Backbone Collection in coffeescript', function () {
    it('creates backbone collection', function (done) {

      this.backbone.app.run({}, function () {
        var collection = helpers.createGenerator('backbone:collection', [
          '../../collection', [
            helpers.createDummyGenerator(),
            'backbone-mocha:collection'
          ]
        ], ['foo']);

        collection.run([], function () {
          helpers.assertFiles([
            ['app/scripts/collections/foo.coffee', /class Temp.Collections.Foo extends Backbone.Collection/]
          ]);
        });
        done();
      });
    });
  });

  describe('Backbone Router  in coffeescript', function () {
    it('creates backbone router', function (done) {

      this.backbone.app.run({}, function () {
        var router = helpers.createGenerator('backbone:router', [
          '../../router', [
            helpers.createDummyGenerator(),
            'backbone-mocha:router'
          ]
        ], ['foo']);

        router.run([], function () {
          helpers.assertFiles([
            ['app/scripts/routes/foo.coffee', /class Temp.Routers.Foo extends Backbone.Router/]
          ]);
        });
        done();
      });
    });
  });

  describe('Backbone View  in coffeescript', function () {
    it('creates backbone view', function (done) {

      this.backbone.app.run({}, function () {
        var view = helpers.createGenerator('backbone:view', [
          '../../view', [
            helpers.createDummyGenerator(),
            'backbone-mocha:view'
          ]
        ], ['foo']);

        view.run([], function () {
          helpers.assertFiles([
            ['app/scripts/views/foo.coffee', /class Temp.Views.Foo extends Backbone.View/],
            'app/scripts/templates/foo.ejs'
          ]);
        });
        done();
      });
    });
  });

});
