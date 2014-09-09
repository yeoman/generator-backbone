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
  },

  writing: {
    createViewFiles: function () {
      var templateExt = '.ejs';
      this.templateFramework =  this.config.get('templateFramework') || 'lodash';
      
      if (this.templateFramework === 'mustache') {
        templateExt = '-template.mustache';
      } else if (this.templateFramework === 'handlebars') {
        templateExt = '.hbs';
      }
      this.jst_path = this.env.options.appPath + '/scripts/templates/' + this.name + templateExt;

      this.template('view.ejs', this.jst_path);
      if (this.templateFramework === 'mustache') {
        this.jst_path = this.name + '-template';
      }

      this._writeTemplate('view', path.join(this.env.options.appPath + '/scripts/views', this.name));

      if (!this.options.requirejs) {
        this._addScriptToIndex('views/' + this.name);
      }
    },

    composeTest: function () {
      this._generateTest('view');
    }
  }
});

module.exports = ViewGenerator;
