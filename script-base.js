'use strict';
var path = require('path'),
    util = require('util'),
    yeoman = require('yeoman-generator'),
    backboneUtils = require('./util.js');

module.exports = Generator;

function Generator() {
  yeoman.generators.NamedBase.apply(this, arguments);

  if (typeof this.env.options.appPath === 'undefined') {
    try {
      this.env.options.appPath = require(path.join(process.cwd(), 'component.json')).appPath;
    } catch (e) {}
    this.env.options.appPath = this.env.options.appPath || 'app';
  }

}

util.inherits(Generator, yeoman.generators.NamedBase);

Generator.prototype.addScriptToIndex = function (script) {
  try {
    var appPath = this.env.options.appPath;

    var fullPath = path.join(appPath, 'index.html');
    backboneUtils.rewriteFile({
      file: fullPath,
      needle: '<!-- endbuild -->',
      splicable: [
        '<script src="scripts/' + script + '.js"></script>'
      ]
    });
  } catch (e) {
    console.log('\nUnable to find '.yellow + fullPath + '. Reference to '.yellow + script + '.js ' + 'not added.\n'.yellow);
  }
};
