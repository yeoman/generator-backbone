/*global describe:true, beforeEach:true, it:true */
'use strict';
var path    = require('path');
var helpers = require('yeoman-generator').test;
var assert  = require('assert');

describe('Backbone generator with RequireJS', function() {
  beforeEach(function(done){
    helpers.testDirectory(path.join(__dirname, './temp'), function(err){
      if(err){
        return done(err);
      }
      this.backbone = {};
      this.backbone.app = helpers.createGenerator('backbone:app',[
        '../../app', [
          helpers.createDummyGenerator(),
          'mocha:app'
        ]
      ]);
      done();
    }.bind(this));

  });

  describe('creates expected files', function(done){
    it('with compassBootstrap', function(done) {
      var expected = [
        ['component.json', /("name": "temp")(|.|\n)*(requirejs)/],
        ['package.json', /"name": "temp"/],
        'Gruntfile.js',
        'app/404.html',
        'app/favicon.ico',
        'app/robots.txt',
        ['app/index.html',/(Bootstrap)(|.|\n)*(RequireJS)/i],
        'app/.htaccess',
        '.gitignore',
        '.gitattributes',
        '.bowerrc',
        'component.json',
        '.jshintrc',
        '.editorconfig',
        'Gruntfile.js',
        'package.json',
        'app/scripts/templates.js',
        'app/scripts/vendor/bootstrap.js',
        ['app/scripts/main.js',/bootstrap/]
      ];

      helpers.mockPrompt(this.backbone.app, {
        'compassBootstrap': 'Y',
        'includeRequireJS': 'Y'
      });

      this.backbone.app.run({}, function () {
        helpers.assertFiles(expected);
        done();
      });

    });

    it('without compassBootstrap', function(done){
      var expected = [
        ['component.json', /("name": "temp")(|.|\n)*(requirejs)/],
        ['package.json', /"name": "temp"/],
        ['Gruntfile.js',/requirejs/],
        'app/404.html',
        'app/favicon.ico',
        'app/robots.txt',
        ['app/index.html',/(RequireJS)/i],
        'app/.htaccess',
        '.gitignore',
        '.gitattributes',
        '.bowerrc',
        'component.json',
        '.jshintrc',
        '.editorconfig',
        'Gruntfile.js',
        'package.json',
        'app/scripts/templates.js'
      ];

      helpers.mockPrompt(this.backbone.app, {
        'compassBootstrap': 'N',
        'includeRequireJS': 'Y'
      });

      this.backbone.app.run({}, function () {
        helpers.assertFiles(expected);
        done();
      });
    });
  });

});
