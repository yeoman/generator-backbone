/*global describe:true, beforeEach:true, it:true */
'use strict';
var path    = require('path');
var helpers = require('yeoman-generator').test;
var assert  = require('assert');
var fs      = require('fs');

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

      helpers.mockPrompt(this.backbone.app, {
        features: ['compassBootstrap', 'requirejs']
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

  describe('creates expected files', function () {
    it('with compassBootstrap', function (done) {
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
        '.yo-rc.json',
        ['app/scripts/main.js', /bootstrap/]
      ];

      this.backbone.app.run({}, function () {
        helpers.assertFiles(expected);
        done();
      });

    });

    it('without compassBootstrap', function (done) {
      var expected = [
        ['bower.json', /("name": "temp")(|.|\n)*(requirejs)/],
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
        '.jshintrc',
        '.editorconfig',
        '.yo-rc.json',
        'Gruntfile.js',
        'package.json'
      ];

      this.backbone.app.run({}, function () {
        helpers.assertFiles(expected);
        done();
      });
    });
  });

  describe('Backbone Model', function () {
    it('creates backbone model', function (done) {
      this.backbone.app.run({}, function () {
        var model = helpers.createGenerator('backbone:model', ['../../model'], ['foo']);

        model.run([], function () {
          helpers.assertFiles([
            ['app/scripts/models/foo.js', /var FooModel = Backbone.Model.extend\(\{/]
          ]);
        });

        done();
      });
    });
  });

  describe('Backbone Collection with RequireJS', function () {
    it('creates backbone collection', function (done) {
      this.backbone.app.run({}, function () {
        var collection = helpers.createGenerator('backbone:collection', ['../../collection'], ['foo']);

        collection.run([], function () {
          helpers.assertFiles([
            ['app/scripts/collections/foo.js', /var FooCollection = Backbone.Collection.extend\(\{/]
          ]);
        });

        done();
      });
    });
  });

  describe('Backbone Router with RequireJS', function () {
    it('creates backbone router', function (done) {
      this.backbone.app.run({}, function () {
        var router = helpers.createGenerator('backbone:router', ['../../router'], ['foo']);

        router.run([], function () {
          helpers.assertFiles([
            ['app/scripts/routes/foo.js', /var FooRouter = Backbone.Router.extend\(\{/]
          ]);
        });

        done();
      });
    });
  });

  describe('Backbone View with RequireJS', function () {
    it('creates backbone view', function (done) {
      this.backbone.app.run({}, function () {
        var view = helpers.createGenerator('backbone:view', ['../../view'], ['foo']);

        view.run([], function () {
          helpers.assertFiles([
            ['app/scripts/views/foo.js', /var FooView = Backbone.View.extend\(\{(.|\n)*app\/scripts\/templates\/foo.ejs/],
            'app/scripts/templates/foo.ejs'
          ]);
        });
        done();
      });
    });
  });

});
