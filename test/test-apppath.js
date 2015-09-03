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
  '    "appPath": "public",',
  '    "appName": "Temp"',
  '  }',
  '}'
].join('\n');

describe('backbone generator with appPath option', function () {
  beforeEach(function (done) {
    var deps = [
      [helpers.createDummyGenerator(), 'mocha:app']
    ];
    helpers.run(path.join(__dirname, '../generators/app'))
      .inTmpDir(function () {
        fs.writeFileSync('.yo-rc.json', config);
      })
      .withArguments(['temp'])
      .withOptions({skipInstall: true, appPath: 'public'})
      .withPrompts({features: ['sassBootstrap']})
      .withGenerators(deps)
      .on('end', done);

  });

  describe('create expected files', function () {
    it('in path specified by --appPath', function () {
      var expectedContent = [
        ['bower.json', /"name": "temp"/],
        ['Gruntfile.js', /app: 'public'/]
      ];

      var expected = [
        'public/404.html',
        'public/favicon.ico',
        'public/robots.txt',
        'public/index.html',
        '.gitignore',
        '.gitattributes',
        '.bowerrc',
        '.jshintrc',
        '.editorconfig',
        '.yo-rc.json',
        'public/scripts/main.js',
        'public/styles/main.scss'
      ];

      assert.file(expected);
      assert.fileContent(expectedContent);
    });
  });

  describe('creates model', function () {
    it('without failure', function (done) {
      test.createSubGenerator(config, 'model', function () {
        assert.fileContent(
          'public/scripts/models/foo.js', /Models.Foo = Backbone.Model.extend\(\{/
        );
        done();
      });
    });
  });

  describe('creates collection', function () {
    it('without failure', function (done) {
      test.createSubGenerator(config, 'collection', function () {
        assert.fileContent(
          'public/scripts/collections/foo.js', /Collections.Foo = Backbone.Collection.extend\(\{/
        );
        done();
      });
    });
  });

  describe('creates router', function () {
    it('without failure', function (done) {
      test.createSubGenerator(config, 'router', function () {
        assert.fileContent(
          'public/scripts/routes/foo.js', /Routers.Foo = Backbone.Router.extend\(\{/
        );
        done();
      });
    });
  });

  describe('creates view', function () {
    it('without failure', function (done) {

      test.createSubGenerator(config, 'view', function () {
        assert.fileContent(
          'public/scripts/views/foo.js', /Views.Foo = Backbone.View.extend\(\{(.|\n)*public\/scripts\/templates\/foo.ejs/
        );
        assert.file('public/scripts/templates/foo.ejs');
        done();
      });
    });
  });

});
