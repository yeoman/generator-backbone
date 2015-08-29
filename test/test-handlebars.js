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
  '    "templateFramework": "handlebars"',
  '  }',
  '}'
].join('\n');

describe('Backbone generator with handlebars', function () {

  describe('creates backbone view', function () {
    it('without failure', function (done) {

      test.createSubGenerator(config, 'view', function () {
        assert.fileContent(
          'app/scripts/views/foo.js', /Views.Foo = Backbone.View.extend\(\{(.|\n)*app\/scripts\/templates\/foo.hbs/
        );
        assert.file('app/scripts/templates/foo.hbs');
        done();
      });
    });
  });
});
