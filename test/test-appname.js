/* global describe, beforeEach, it */
'use strict';
var path = require('path');
var assert = require('assert');
var helpers = require('yeoman-generator').test;
var fs = require('fs');

describe('backbone generator with name option', function () {
  var expectedAppName = 'myYoApp';

  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('backbone:app', [
        '../../app', [
          helpers.createDummyGenerator(),
          'mocha:app'
        ]
      ], ['my-yo-app'], {'skip-install': true});

      helpers.mockPrompt(this.app, {
        features: ['compassBootstrap']
      });

      done();
    }.bind(this));
  });

  it('should generate the custom appName in each file', function (done) {
    var expected = [
      'app/scripts/main.js',
      'app/index.html'
    ];

    this.app.run({}, function () {
      // Check if all files are created for the test
      helpers.assertFiles(expected);

      // read JS Files
      var main_js = fs.readFileSync('app/scripts/main.js', 'utf8');

      // Test JS Files
      var regex_js = new RegExp('window.' + expectedAppName + ' = \\{');
      assert.ok(regex_js.test(main_js), 'main.js template using a wrong appName');

      // read HTML file
      var index_html = fs.readFileSync('app/index.html', 'utf8');

      // Test HTML File
      var regex_html = new RegExp('<title>' + expectedAppName + '</title>');
      assert.ok(regex_html.test(index_html), 'index.html template using a wrong appName');
      done();
    });
  });

  describe('Backbone Model', function () {
    it('creates backbone model with correct name', function (done) {
      var model = helpers.createGenerator(
        'backbone:model', ['../../model'], ['foo']
      );

      this.app.run({}, function () {
        var out = [
          '{',
          '    "name": "', expectedAppName, '"',
          '}'
        ];
        fs.writeFileSync('bower.json', out.join('\n'));

        model.run([], function () {
          helpers.assertFiles([
            ['app/scripts/models/foo.js',
              /Models.FooModel = Backbone.Model.extend\(\{/]
          ]);

          var model_js = fs.readFileSync('app/scripts/models/foo.js', 'utf8');
          var regex_js = new RegExp('\\.Models\\.FooModel');
          assert.ok(regex_js.test(model_js), 'model template using a wrong appName');
        });

        done();
      });
    });
  });
});
