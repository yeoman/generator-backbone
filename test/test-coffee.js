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
  '    "coffee": "true"',
  '  }',
  '}'
].join('\n');

describe('Backbone generator test with --coffee option', function () {
  beforeEach(function (done) {
    var prompts = {
      features: ['sassBootstrap', 'coffee']
    };

    test.createAppGenerator(config, prompts, done);
  });

  it('creates expected files', function () {
    var expectedContent = [
      ['bower.json', /"name": "temp"/]
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
      'app/scripts/main.coffee'
    ];

    assert.file(expected);
    assert.fileContent(expectedContent);

  });

  describe('creates model in coffeescript', function () {
    it('without failure', function (done) {

      test.createSubGenerator(config, 'model', function () {
        assert.fileContent(
          'app/scripts/models/foo.coffee', /class Temp.Models.Foo extends Backbone.Model/
        );
        done();
      });
    });
  });

  describe('creates collection in coffeescript', function () {
    it('without failure', function (done) {

      test.createSubGenerator(config, 'collection', function () {
        assert.fileContent(
          'app/scripts/collections/foo.coffee', /class Temp.Collections.Foo extends Backbone.Collection/
        );
        done();
      });
    });
  });

  describe('creates router in coffeescript', function () {
    it('without failure', function (done) {

      test.createSubGenerator(config, 'router', function () {
        assert.fileContent(
          'app/scripts/routes/foo.coffee', /class Temp.Routers.Foo extends Backbone.Router/
        );
        done();
      });
    });
  });

  describe('creates view in coffeescript', function () {
    it('without failure', function (done) {

      test.createSubGenerator(config, 'view', function () {
        assert.fileContent(
          'app/scripts/views/foo.coffee', /class Temp.Views.Foo extends Backbone.View/
        );
        assert.file('app/scripts/templates/foo.ejs');
        done();
      });
    });
  });
});
