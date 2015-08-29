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
  '    "templateFramework": "mustache"',
  '  }',
  '}'
].join('\n');

describe('Backbone generator with mustache', function () {

  it('creates backbone view', function (done) {

    test.createSubGenerator(config, 'view', function () {
      assert.fileContent(
        'app/scripts/views/foo.js', /Views.Foo = Backbone.View.extend\(\{(.|\n)*foo-template/
      );
      assert.file('app/scripts/templates/foo-template.mustache');
      done();
    });
  });
});
