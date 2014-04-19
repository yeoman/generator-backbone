/*global describe:true, beforeEach:true, it:true */
'use strict';
var path    = require('path');
var yeoman  = require('yeoman-generator');
var helpers = yeoman.test;
var assert  = yeoman.assert;
var fs      = require('fs');
var test    = require('./helper.js');

describe('Backbone generator with RequireJS', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, './temp'), function (err) {
      if (err) {
        return done(err);
      }
      this.backbone = {};
      this.backbone.app = test.createAppGenerator();

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
        'app/.htaccess',
        '.gitignore',
        '.gitattributes',
        '.bowerrc',
        '.jshintrc',
        '.editorconfig'
      ];

      this.backbone.app.run({}, function () {
        assert.file(expected);
        assert.fileContent(expectedContent);
        done();
      });

    });

    it('without compassBootstrap', function (done) {
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
        assert.file(expected);
        assert.fileContent(expectedContent);
        done();
      });
    });
  });

  describe('creates model', function () {
    it('without failure', function (done) {
      this.backbone.app.run({}, function () {
        test.createSubGenerator('model', function () {
          assert.fileContent(
            'app/scripts/models/foo.js', /var FooModel = Backbone.Model.extend\(\{/
          );
          done();
        });
      });
    });
  });

  describe('creates collection', function () {
    it('without failure', function (done) {
      this.backbone.app.run({}, function () {
        test.createSubGenerator('collection', function () {
          assert.fileContent(
            'app/scripts/collections/foo.js', /var FooCollection = Backbone.Collection.extend\(\{/
          );
          done();
        });
      });
    });
  });

  describe('creates router', function () {
    it('without failure', function (done) {
      this.backbone.app.run({}, function () {
        test.createSubGenerator('router', function () {
          assert.fileContent(
            'app/scripts/routes/foo.js', /var FooRouter = Backbone.Router.extend\(\{/
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
            'app/scripts/views/foo.js', /var FooView = Backbone.View.extend\(\{(.|\n)*app\/scripts\/templates\/foo.ejs/
          );
          assert.file('app/scripts/templates/foo.ejs');
          done();
        });
      });
    });
  });
});
