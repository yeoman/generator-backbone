/*global describe:true, beforeEach:true, it:true */
'use strict';
var path    = require('path');
var yeoman  = require('yeoman-generator');
var helpers = yeoman.test;
var assert  = yeoman.assert;
var fs      = require('fs');
var test    = require('./helper.js');

describe('backbone generator with appPath option', function () {
  beforeEach(function (done) {
    var deps = [
      [helpers.createDummyGenerator(), 'mocha:app']
    ];
    this.backbone = {};
    this.backbone.app = helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, 'temp'), function () {
        var out = [
          '{',
          '  "generator-backbone": {',
          '    "appPath": "public",',
          '    "appName": "Temp"',
          '  }',
          '}'
        ];
        fs.writeFileSync('.yo-rc.json', out.join('\n'));
      })
      .withArguments(['temp'])
      .withOptions({'skip-install': true, appPath: 'public'})
      .withPrompt({features: ['compassBootstrap']})
      .withGenerators(deps);

    done();
  });

  describe('create expected files', function () {
    it('in path specified by --appPath', function (done) {
      var expectedContent = [
        ['bower.json', /"name": "temp"/],
        ['package.json', /"name": "temp"/],
        ['Gruntfile.js', /app: 'public'/]
      ];

      var expected = [
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
        '.yo-rc.json',
        'public/scripts/main.js',
        'public/styles/main.scss'
      ];

      this.backbone.app
        .on('end', function () {
          assert.file(expected);
          assert.fileContent(expectedContent);
          done();
        });
    });
  });

  describe('creates model', function () {
    it('without failure', function (done) {
      this.backbone.app.on('end', function () {
        test.createSubGenerator('model', function () {
          assert.fileContent(
            'public/scripts/models/foo.js', /Models.Foo = Backbone.Model.extend\(\{/
          );
          done();
        });
      });
    });
  });

  describe('creates collection', function () {
    it('without failure', function (done) {
      this.backbone.app.on('end', function () {
        test.createSubGenerator('collection', function () {
          assert.fileContent(
            'public/scripts/collections/foo.js', /Collections.Foo = Backbone.Collection.extend\(\{/
          );
          done();
        });
      });
    });
  });

  describe('creates router', function () {
    it('without failure', function (done) {
      this.backbone.app.on('end', function () {
        test.createSubGenerator('router', function () {
          assert.fileContent(
            'public/scripts/routes/foo.js', /Routers.Foo = Backbone.Router.extend\(\{/
          );
          done();
        });
      });
    });
  });

  describe('creates view', function () {
    it('without failure', function (done) {

      this.backbone.app.on('end', function () {
        test.createSubGenerator('view', function () {
          assert.fileContent(
            'public/scripts/views/foo.js', /Views.Foo = Backbone.View.extend\(\{(.|\n)*public\/scripts\/templates\/foo.ejs/
          );
          assert.file('public/scripts/templates/foo.ejs');
          done();
        });
      });
    });
  });

});
