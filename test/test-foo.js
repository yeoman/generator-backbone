/*global describe:true, beforeEach:true, it:true */
'use strict';
var path    = require('path');
var yeoman  = require('yeoman-generator');
var helpers = yeoman.test;
var assert  = yeoman.assert;
var fs      = require('fs');
var test    = require('./helper.js');

describe('Backbone generator test', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, './temp'), function (err) {
      if (err) {
        return done(err);
      }
      this.backbone = {};
      this.backbone.app = test.createAppGenerator();

      helpers.mockPrompt(this.backbone.app, {
        features: ['compassBootstrap']
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

  it('every generator can be required without throwing', function () {
    // not testing the actual run of generators yet
    this.all = require('../all');
    this.app = require('../app');
    this.collection = require('../collection');
    this.model = require('../model');
    this.router = require('../router');
    this.view = require('../view');
  });

  describe('create expected files', function () {
    it('in path /app', function (done) {
      var expectedContent = [
        ['bower.json', /"name": "temp"/],
        ['package.json', /"name": "temp"/]
      ];
      var expected = [
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
        'app/scripts/main.js',
        'app/styles/main.scss'
      ];

      this.backbone.app.run({}, function () {
        assert.file(expected);
        assert.fileContent(expectedContent);
        done();
      });
    });
  });

  describe('creates backbone model', function () {
    it('without failure', function (done) {

      this.backbone.app.run({}, function () {
        test.createSubGenerator('model', function () {
          assert.fileContent(
            'app/scripts/models/foo.js', /Models.Foo = Backbone.Model.extend\(\{/
          );
          done();
        });
      });
    });
  });

  describe('creates backbone collection', function () {
    it('without failure', function (done) {

      this.backbone.app.run({}, function () {
        test.createSubGenerator('collection', function () {
          assert.fileContent(
            'app/scripts/collections/foo.js', /Collections.Foo = Backbone.Collection.extend\(\{/
          );
          done();
        });
      });
    });
  });

  describe('creates backbone router', function () {
    it('without failure', function (done) {

      this.backbone.app.run({}, function () {
        test.createSubGenerator('router', function () {
          assert.fileContent(
            'app/scripts/routes/foo.js', /Routers.Foo = Backbone.Router.extend\(\{/
          );
          done();
        });
      });
    });
  });

  describe('creates backbone view', function () {
    it('without failure', function (done) {

      this.backbone.app.run({}, function () {
        test.createSubGenerator('view', function () {
          assert.fileContent(
            'app/scripts/views/foo.js', /Views.Foo = Backbone.View.extend\(\{(.|\n)*app\/scripts\/templates\/foo.ejs/
          );
          assert.file('app/scripts/templates/foo.ejs');
          done();
        });
      });
    });
  });

});
