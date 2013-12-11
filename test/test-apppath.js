/* global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var fs = require('fs');

describe('backbone generator with appPath option', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('backbone:app', [
        '../../app', [
          helpers.createDummyGenerator(), 'mocha:app'
        ]
      ], ['temp'], {appPath: 'public', 'skip-install': true});

      helpers.mockPrompt(this.app, {
        features: ['compassBootstrap']
      });

      var out = [
        '{',
        '  "generator-backbone": {',
        '    "appPath": "public"',
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
        // add files you expect to exist here.
        ['Gruntfile.js', /app: 'public'/],
        ['bower.json', /"name": "temp"/],
        ['package.json', /"name": "temp"/],
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
        'Gruntfile.js',
        'package.json',
        'public/scripts/main.js',
        'public/styles/main.scss'
      ];

      this.app.run({}, function () {
        helpers.assertFiles(expected);
        done();
      });
    });
  });

  describe('creates sub generators', function () {

    it('backbone model', function (done) {
      var model = helpers.createGenerator('backbone:model', ['../../model'], ['foo']);

      this.app.run({}, function () {
        model.run([], function () {
          helpers.assertFiles([
            ['public/scripts/models/foo.js',
              /Models.FooModel = Backbone.Model.extend\(\{/]
          ]);
        });
        done();
      });
    });

    it('backbone router', function (done) {
      var router = helpers.createGenerator('backbone:router', ['../../router'], ['foo']);

      this.app.run({}, function () {
        router.run([], function () {
          helpers.assertFiles([
            ['public/scripts/routes/foo.js', /Routers.FooRouter = Backbone.Router.extend\(\{/]
          ]);
        });
        done();
      });
    });

    it('backbone collection', function (done) {
      var collection = helpers.createGenerator('backbone:collection', ['../../collection'], ['foo']);

      this.app.run({}, function () {
        collection.run([], function () {
          helpers.assertFiles([
            ['public/scripts/collections/foo.js', /Collections.FooCollection = Backbone.Collection.extend\(\{/]
          ]);
        });
        done();
      });
    });

    it('backbone view', function (done) {
      var view = helpers.createGenerator('backbone:view', [
        '../../view'
      ], ['foo']);

      this.app.run({}, function () {
        view.run([], function () {
          helpers.assertFiles([
            ['public/scripts/views/foo.js', /Views.FooView = Backbone.View.extend\(\{(.|\n)*public\/scripts\/templates\/foo.ejs/],
            'public/scripts/templates/foo.ejs'
          ]);
        });
        done();
      });
    });
  });
});
