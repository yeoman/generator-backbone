var path    = require('path');
var helpers = require('yeoman-generator').test;
var assert  = require("assert");


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
  before(helpers.before(path.join(__dirname, './temp')));

  it('every generator can be required without throwing', function() {
    // not testing the actual run of generators yet
    this.all = require('../all');
    this.app = require('../app');
    this.collection = require('../collection');
    this.model = require('../model');
    this.router = require('../router');
    this.view = require('../view');
  });


  // FIXME
  it.skip('creates expected files', function() {

    // Use helpers.assertFile() to help you test the output of your generator
    //
    // Example:
    //
    //    // check file exists
    //    helpers.assertFile('app/model/post.js');
    //    // Check content
    //    helpers.assertFile('app/model/post.js', /Backbone\.model/);
    it('should create expected files');

  });
});
