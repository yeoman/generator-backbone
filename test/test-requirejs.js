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
  '    "appName": "Temp",',
  '    "includeRequireJS": "true"',
  '  }',
  '}'
].join('\n');

describe('Backbone generator with RequireJS', function () {

  beforeEach(function (done) {
    var prompts = {
      features: ['sassBootstrap', 'requirejs']
    };
    test.createAppGenerator(config, prompts, done);
  });

  describe('creates expected files', function () {
    it('with sassBootstrap', function () {
      var expectedContent = [
        ['bower.json', /("name": "temp")(|.|\n)*(requirejs)/],
        ['package.json', /"name": "temp"/],
        ['app/index.html', /(Bootstrap)(|.|\n)*(RequireJS)/i],
        ['app/scripts/main.js', /bootstrap/]
      ];
      var expected = [
        'Gruntfile.js',
        'app/404.html',
        'app/favicon.ico',
        'app/robots.txt',
        '.gitignore',
        '.gitattributes',
        '.bowerrc',
        '.jshintrc',
        '.editorconfig'
      ];

      assert.file(expected);
      assert.fileContent(expectedContent);

    });

    it('without sassBootstrap', function () {
      var expectedContent = [
        ['bower.json', /("name": "temp")(|.|\n)*(requirejs)/],
        ['package.json', /"name": "temp"/],
        ['Gruntfile.js', /requirejs/],
        ['app/index.html', /(RequireJS)/i]
      ];
      var expected = [
        'app/404.html',
        'app/favicon.ico',
        'app/robots.txt',
        '.gitignore',
        '.gitattributes',
        '.bowerrc',
        '.jshintrc',
        '.editorconfig',
        '.yo-rc.json',
        'Gruntfile.js',
        'package.json'
      ];

      assert.file(expected);
      assert.fileContent(expectedContent);
    });
  });

  describe('creates model', function () {
    it('without failure', function (done) {
      test.createSubGenerator(config, 'model', function () {
        assert.fileContent(
          'app/scripts/models/foo.js', /var FooModel = Backbone.Model.extend\(\{/
        );
        done();
      });
    });
  });

  describe('creates collection', function () {
    it('without failure', function (done) {
      test.createSubGenerator(config, 'collection', function () {
        assert.fileContent(
          'app/scripts/collections/foo.js', /var FooCollection = Backbone.Collection.extend\(\{/
        );
        done();
      });
    });
  });

  describe('creates router', function () {
    it('without failure', function (done) {
      test.createSubGenerator(config, 'router', function () {
        assert.fileContent(
          'app/scripts/routes/foo.js', /var FooRouter = Backbone.Router.extend\(\{/
        );
        done();
      });
    });
  });

  describe('creates backbone view', function () {
    it('without failure', function (done) {
      test.createSubGenerator(config, 'view', function () {
        assert.fileContent(
          'app/scripts/views/foo.js', /var FooView = Backbone.View.extend\(\{(.|\n)*app\/scripts\/templates\/foo.ejs/
        );
        assert.file('app/scripts/templates/foo.ejs');
        done();
      });
    });
  });
});
