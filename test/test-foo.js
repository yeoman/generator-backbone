/*global describe:true, beforeEach:true, it:true */
'use strict';
var path    = require('path');
var yeoman  = require('yeoman-generator');
var helpers = yeoman.test;
var assert  = yeoman.assert;
var fs      = require('fs');
var test    = require('./helper.js');

var config = [
  '{',
  '  "generator-backbone": {',
  '    "appPath": "app",',
  '    "appName": "Temp"',
  '  }',
  '}'
].join('\n');

describe('Backbone generator test', function () {
  beforeEach(function (done) {
    var prompts = {
      features: ['sassBootstrap']
    };

    test.createAppGenerator(config, prompts, done);
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
    it('in path /app', function () {
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
        '.gitignore',
        '.gitattributes',
        '.bowerrc',
        '.jshintrc',
        '.editorconfig',
        '.yo-rc.json',
        'app/scripts/main.js',
        'app/styles/main.scss'
      ];

      assert.file(expected);
      assert.fileContent(expectedContent);
    });
  });

  describe('creates backbone model', function () {
    it('without failure', function (done) {

      test.createSubGenerator(config, 'model', function () {
        assert.fileContent(
          'app/scripts/models/foo.js', /Models.Foo = Backbone.Model.extend\(\{/
        );
        done();
      });
    });
  });

  describe('creates backbone collection', function () {
    it('without failure', function (done) {

      test.createSubGenerator(config, 'collection', function () {
        assert.fileContent(
          'app/scripts/collections/foo.js', /Collections.Foo = Backbone.Collection.extend\(\{/
        );
        done();
      });
    });
  });

  describe('creates backbone router', function () {
    it('without failure', function (done) {

      test.createSubGenerator(config, 'router', function () {
        assert.fileContent(
          'app/scripts/routes/foo.js', /Routers.Foo = Backbone.Router.extend\(\{/
        );
        done();
      });
    });
  });

  describe('creates backbone view', function () {
    it('without failure', function (done) {

      test.createSubGenerator(config, 'view', function () {
        assert.fileContent(
          'app/scripts/views/foo.js', /Views.Foo = Backbone.View.extend\(\{(.|\n)*app\/scripts\/templates\/foo.ejs/
        );
        assert.file('app/scripts/templates/foo.ejs');
        done();
      });
    });
  });

});
