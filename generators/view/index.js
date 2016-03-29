/*jshint latedef:false */
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var ScriptBase = require('../../script-base');

var ViewGenerator = ScriptBase.extend({

  writing: {
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

      this._generate('view', {
        'jst_path': this.jst_path
      });

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
