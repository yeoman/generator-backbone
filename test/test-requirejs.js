/*global describe:true, beforeEach:true, it:true */
'use strict';
var path    = require('path');
var helpers = require('yeoman-generator').test;
var assert  = require('assert');

describe('Backbone generator with RequireJS', function () {
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
      done();
    }.bind(this));

  });

  describe('creates expected files', function (done) {
    it('with compassBootstrap', function (done) {
      var expected = [
        ['component.json', /("name": "temp")(|.|\n)*(requirejs)/],
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
        'component.json',
        '.jshintrc',
        '.editorconfig',
        'Gruntfile.js',
        'package.json',
        'app/scripts/vendor/bootstrap.js',
        ['app/scripts/main.js', /bootstrap/]
      ];

      helpers.mockPrompt(this.backbone.app, {
        'compassBootstrap': 'Y',
        'includeRequireJS': 'Y'
      });

      this.backbone.app.run({}, function () {
        helpers.assertFiles(expected);
        done();
      });

    });

    it('without compassBootstrap', function (done) {
      var expected = [
        ['component.json', /("name": "temp")(|.|\n)*(requirejs)/],
        ['package.json', /"name": "temp"/],
        ['Gruntfile.js', /requirejs/],
        'app/404.html',
        'app/favicon.ico',
        'app/robots.txt',
        ['app/index.html', /(RequireJS)/i],
        'app/.htaccess',
        '.gitignore',
        '.gitattributes',
        '.bowerrc',
        'component.json',
        '.jshintrc',
        '.editorconfig',
        'Gruntfile.js',
        'package.json',
      ];

      helpers.mockPrompt(this.backbone.app, {
        'compassBootstrap': 'N',
        'includeRequireJS': 'Y'
      });

      this.backbone.app.run({}, function () {
        helpers.assertFiles(expected);
        done();
      });
    });
  });

  describe('Backbone Model', function () {
    it('creates backbone model', function (done) {
      var model = helpers.createGenerator('backbone:model', ['../../model'], ['foo']);

      model.isUsingRequireJS = function () {
        return true;
      };

      model.run([], function () {
        helpers.assertFiles([
          ['app/scripts/models/foo-model.js', /var FooModel = Backbone.Model.extend\(\{/]
        ]);
      });

      done();
    });
  });

  describe('Backbone Collection with RequireJS', function () {
    it('creates backbone collection', function (done) {
      var collection = helpers.createGenerator('backbone:collection', ['../../collection'], ['foo']);

      collection.isUsingRequireJS = function () {
        return true;
      };

      collection.run([], function () {
        helpers.assertFiles([
          ['app/scripts/collections/foo-collection.js', /var FooCollection = Backbone.Collection.extend\(\{/]
        ]);
      });

      done();
    });
  });

  describe('Backbone Router with RequireJS', function () {
    it('creates backbone router', function (done) {
      var router = helpers.createGenerator('backbone:router', ['../../router'], ['foo']);

      router.isUsingRequireJS = function () {
        return true;
      };

      router.run([], function () {
        helpers.assertFiles([
          ['app/scripts/routes/foo-router.js', /var FooRouter = Backbone.Router.extend\(\{/]
        ]);
      });

      done();
    });
  });

  describe('Backbone View', function () {
    it('creates backbone view', function (done) {
      var view = helpers.createGenerator('backbone:view', ['../../view'], ['foo']);

      view.isUsingRequireJS = function () {
        return true;
      };

      view.run([], function () {
        helpers.assertFiles([
          ['app/scripts/views/foo-view.js', /var FooView = Backbone.View.extend\(\{(.|\n)*app\/scripts\/templates\/foo.ejs/],
          'app/scripts/templates/foo.ejs'
        ]);
      });
      done();
    });
  });

});
