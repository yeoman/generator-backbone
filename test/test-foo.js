/*global describe beforeEach it*/

var path    = require('path');
var helpers = require('yeoman-generator').test;
var assert  = require('assert');


// XXX With current API, (prior v2), that's a complete mess to setup generators
// if they differ from the standard lib/generators layout.
//
// Even for workarounds, the API is awful and doesn't let you do anything.
//
// With the new API, it will be much easier to manually register one or a set
// of generators, and manage multiple environments.
//
// Something like:
//
//    generators()
//      .register(require('../all'), 'backbone:all')
//      .register(require('../app'), 'backbone:app')
//      .register(require('../view'), 'backbone:view')
//      .register(require('../router'), 'backbone:router')
//      .register(require('../model'), 'backbone:model')
//      .register(require('../collection'), 'backbone:collection')
//
// Or for the lazy guy:
//
//    generators()
//      .lookup('*:*', path.join(__dirname, '..'))
//

describe('Backbone generator test', function() {
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

  it('every generator can be required without throwing', function() {
    // not testing the actual run of generators yet
    this.all = require('../all');
    this.app = require('../app');
    this.collection = require('../collection');
    this.model = require('../model');
    this.router = require('../router');
    this.view = require('../view');
  });

  it('creates expected files', function(done) {
    var expected = [
      ['component.json', /"name": "temp"/],
      ['package.json', /"name": "temp"/],
      'Gruntfile.js',
      'app/404.html',
      'app/favicon.ico',
      'app/robots.txt',
      'app/index.html',
      'app/.htaccess',
      '.gitignore',
      '.gitattributes',
      '.bowerrc',
      'component.json',
      '.jshintrc',
      '.editorconfig',
      'Gruntfile.js',
      'package.json'
    ];

    this.backbone.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });

  });

  describe('Backbone Model', function() {
    it('creates backbone model', function(done){
      var model;
      model = helpers.createGenerator('backbone:model',['../../model'], ['foo']);

      model.run([], function(){
        helpers.assertFiles([
          ['app/scripts/models/foo-model.js', /Models.FooModel = Backbone.Model.extend\(\{/]
        ]);
      });
      done();
    });
  });

  describe('Backbone Collection', function() {
    it('creates backbone collection', function(done){
      var collection;
      collection = helpers.createGenerator('backbone:collection',['../../collection'], ['foo']);

      collection.run([], function(){
        helpers.assertFiles([
          ['app/scripts/collections/foo-collection.js', /Collections.FooCollection = Backbone.Collection.extend\(\{/]
        ]);
      });
      done();
    });
  });

  describe('Backbone Router', function() {
    it('creates backbone router', function(done){
      var router = helpers.createGenerator('backbone:router',['../../router'], ['foo']);
      router.run([], function(){
        helpers.assertFiles([
          ['app/scripts/routes/foo-router.js', /Routers.FooRouter = Backbone.Router.extend\(\{/]
        ]);
      });
      done();
    });
  });
});
