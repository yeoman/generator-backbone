/*jshint latedef:false */
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var scriptBase = require('../script-base');

var ViewGenerator = scriptBase.extend({
  constructor: function () {
    scriptBase.apply(this, arguments);

    var dirPath = this.options.coffee ? '../templates/coffeescript/' : '../templates';
    this.sourceRoot(path.join(__dirname, dirPath));

    var testOptions = {
      as: 'view',
      args: [this.name],
      options: {
        coffee: this.config.get('coffee'),
        ui: this.config.get('ui')
      }
    };

    if (this.generateTests()) {
      this.hookFor('backbone-mocha', testOptions);
    }
  },

  createViewFiles: function () {
    var templateFramework =  this.config.get('templateFramework') || 'lodash';
    var templateExt = '.ejs';
    if (templateFramework === 'mustache') {
      templateExt = '-template.mustache';
    } else if (templateFramework === 'handlebars') {
      templateExt = '.hbs';
    }
    this.jst_path = this.env.options.appPath + '/scripts/templates/' + this.name + templateExt;

    this.template('view.ejs', this.jst_path);
    if (templateFramework === 'mustache') {
      this.jst_path = this.name + '-template';
    }

    this.writeTemplate('view', path.join(this.env.options.appPath + '/scripts/views', this.name));

    if (!this.options.requirejs) {
      this.addScriptToIndex('views/' + this.name);
    }
  }
});

module.exports = ViewGenerator;
