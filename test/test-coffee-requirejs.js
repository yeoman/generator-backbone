/*global describe:true, beforeEach:true, it:true */
'use strict';
var path    = require('path');
var yeoman  = require('yeoman-generator');
var helpers = yeoman.test;
var assert  = yeoman.assert;
var fs      = require('fs');
var test    = require('./helper.js');

describe('Backbone generator test with --coffee and --requirejs option', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, './temp'), function (err) {
      if (err) {
        return done(err);
      }
      this.backbone = {};
      this.backbone.app = test.createAppGenerator();

      helpers.mockPrompt(this.backbone.app, {
        features: ['compassBootstrap', 'coffee', 'requirejs']
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
    var expectedContent = [
      ['bower.json', /("name": "temp")(|.|\n)*(requirejs)/],
      ['package.json', /"name": "temp"/],
      ['app/index.html', /(Bootstrap)(|.|\n)*(RequireJS)/i]
    ];
    var expected = [
      'Gruntfile.js',
      'app/404.html',
      'app/favicon.ico',
      'app/robots.txt',
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
      assert.file(expected);
      assert.fileContent(expectedContent);
      done();
    });

  });

  describe('creates model in coffeescript with rjs', function () {
    it('without failure', function (done) {

      this.backbone.app.run([], function () {
        test.createSubGenerator('model', function () {
          assert.fileContent(
            'app/scripts/models/foo.coffee', /class FooModel extends Backbone.Model/
          );
          done();
        });
      });
    });
  });

  describe('creates collection in coffeescript with rjs', function () {
    it('without failure', function (done) {

      this.backbone.app.run({}, function () {
        test.createSubGenerator('collection', function () {
          assert.fileContent(
            'app/scripts/collections/foo.coffee', /class FooCollection extends Backbone.Collection/
          );
          done();
        });
      });
    });
  });

  describe('creates router in coffeescript with rjs', function () {
    it('without failure', function (done) {

      this.backbone.app.run({}, function () {
        test.createSubGenerator('router', function () {
          assert.fileContent(
            'app/scripts/routes/foo.coffee', /class FooRouter extends Backbone.Router/
          );
          done();
        });

      });
    });
  });

  describe('creates view in coffeescript with rjs', function () {
    it('without failure', function (done) {

      this.backbone.app.run({}, function () {
        test.createSubGenerator('view', function () {
          assert.fileContent(
            'app/scripts/views/foo.coffee', /class FooView extends Backbone.View(.|\n)*app\/scripts\/templates\/foo.ejs/
          );
          assert.file('app/scripts/templates/foo.ejs');
          done();
        });

      });
    });
  });

});
