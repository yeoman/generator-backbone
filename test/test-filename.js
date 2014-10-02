/*global describe:true, beforeEach:true, it:true */
'use strict';
var path    = require('path');
var yeoman  = require('yeoman-generator');
var helpers = yeoman.test;
var assert  = yeoman.assert;
var fs      = require('fs');
var test    = require('./helper.js');

describe('Valid filenames', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, './temp'), function (err) {
      if (err) {
        return done(err);
      }
      this.backbone = {};
      this.backbone.app = test.createAppGenerator();

      helpers.mockPrompt(this.backbone.app, {
        features: ['compassBootstrap']
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


  describe('converts filename', function () {
    it('to lowerCase', function (done) {
      this.backbone.app.run({}, function () {
        test.createSubGenerator('model', function () {
          assert.file('app/scripts/models/user.js');
          done();
        }, 'User');
      });
    });
  });

  describe('dasherize filename', function () {
    it('when filename contains camelcase', function (done) {
      this.backbone.app.run({}, function () {
        test.createSubGenerator('model', function () {
          assert.file('app/scripts/models/product-name.js');
          done();
        }, 'ProductName');
      });
    });

    it('when filename contains underscore', function (done) {
      this.backbone.app.run({}, function () {
        test.createSubGenerator('model', function () {
          assert.file('app/scripts/models/user-admin.js');
          done();
        }, 'User_Admin');
      });
    });
  });

  describe('forwardslash in filename', function () {
    it('is valid', function (done) {
      this.backbone.app.run({}, function () {
        test.createSubGenerator('model', function () {
          assert.file('app/scripts/models/user/admin.js');
          done();
        }, 'User/Admin');
      });
    });
  });

  describe('converts backslash in filename', function () {
    it('to forwardslash', function (done) {
      this.backbone.app.run({}, function () {
        test.createSubGenerator('model', function () {
          assert.file('app/scripts/models/user/admin.js');
          done();
        }, 'User\\Admin');
      });
    });
  });
});
