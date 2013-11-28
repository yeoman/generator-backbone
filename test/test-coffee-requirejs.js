/*global describe:true, beforeEach:true, it:true */
'use strict';
var path    = require('path');
var helpers = require('yeoman-generator').test;
var assert  = require('assert');

describe('Backbone generator test with --coffee and --requirejs option', function () {
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

      this.backbone.app.options.coffee = true;
      this.backbone.app.options.requirejs = true;

      helpers.mockPrompt(this.backbone.app, {
        features: ['compassBootstrap','coffee', 'requirejs']
      });

      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      ['bower.json', /("name": "temp")(|.|\n)*(requirejs)/],
      ['package.json', /"name": "temp"/],
      'Gruntfile.js',
      'app/404.html',
      'app/favicon.ico',
      'app/robots.txt',
      ['app/index.html', /(Bootstrap)(|.|\n)*(RequireJS)/i],
      'app/.htaccess',
      '.gitignore',
      '.gitattributes',
      '.bowerrc',
      '.jshintrc',
      '.editorconfig',
      'package.json',
      'app/scripts/main.coffee'
    ];

    this.backbone.app.run([], function () {
      helpers.assertFiles(expected);
      done();
    });

  });

  describe('Backbone Model in coffeescript with RequireJS support', function () {
    it('creates backbone model', function (done) {

      this.backbone.app.run([], function () {
        var model = helpers.createGenerator('backbone:model', ['../../model'], ['foo']);
        model.run([], function () {
          helpers.assertFiles([
            ['app/scripts/models/foo.coffee', /class FooModel extends Backbone.Model/]
          ]);
        });
        done();
      });
    });
  });

  describe('Backbone Collection in coffeescript with RequireJS support', function () {
    it('creates backbone collection', function (done) {

      this.backbone.app.run({}, function () {
        var collection = helpers.createGenerator('backbone:collection', ['../../collection'], ['foo']);

        collection.run([], function () {
          helpers.assertFiles([
            ['app/scripts/collections/foo.coffee', /class FooCollection extends Backbone.Collection/]
          ]);
        });
        done();
      });
    });
  });

  describe('Backbone Router  in coffeescript with RequireJS support', function () {
    it('creates backbone router', function (done) {

      this.backbone.app.run({}, function () {
        var router = helpers.createGenerator('backbone:router', ['../../router'], ['foo']);

        router.run([], function () {
          helpers.assertFiles([
            ['app/scripts/routes/foo.coffee', /class FooRouter extends Backbone.Router/]
          ]);
        });
        done();
      });
    });
  });

  describe('Backbone View  in coffeescript with RequireJS support', function () {
    it('creates backbone view', function (done) {

      this.backbone.app.run({}, function () {
        var view = helpers.createGenerator('backbone:view', ['../../view'], ['foo']);

        view.run([], function () {
          helpers.assertFiles([
            ['app/scripts/views/foo.coffee', /class FooView extends Backbone.View(.|\n)*app\/scripts\/templates\/foo.ejs/],
            'app/scripts/templates/foo.ejs'
          ]);
        });
        done();
      });
    });
  });
});
