# Backbone.js generator [![Build Status](https://secure.travis-ci.org/yeoman/generator-backbone.png?branch=master)](http://travis-ci.org/yeoman/generator-backbone)

Maintainer: [Revath S Kumar](https://github.com/revathskumar)

A Backbone generator for Yeoman that provides a functional boilerplate Backbone app out of the box. You also get access to a number of sub-generators which can be used to easily create individual models, views, collections and so on.

Optional RequireJS (AMD) support has recently been added as a prompt when using the generator on new projects.


## Usage

Install: `npm install -g generator-backbone`

Make a new directory and `cd` into it:
```
mkdir my-new-project && cd $_
```

Run `yo backbone`, optionally passing an app name:
```
yo backbone [app-name]
```

## Generators

Available generators:

- backbone:model
- backbone:view
- backbone:collection
- backbone:router
- backbone:all

## Typical workflow

```
yo backbone # generates your application base and build workflow
yo backbone:model blog
yo backbone:collection blog
yo backbone:router blog
yo backbone:view blog
grunt server
```

Also checkout this [NetTuts write-up](http://net.tutsplus.com/tutorials/javascript-ajax/building-apps-with-the-yeoman-workflow/) for a guide to building Backbone.js apps using this generator.


## Options

* `--coffee`
  
  Generate scaffolds in CoffeeScript.
  RequireJS is not supported with `--coffee` option for now.

* `--skip-install`

  Skips the automatic execution of `bower` and `npm` after
  scaffolding has finished.

* `--test-framework=[framework]`

  Defaults to `mocha`. Can be switched for
  another supported testing framework like `jasmine`.

* `--template-framework=[framework]`

  Defaults to `lodash` templating with grunt-contrib-jst.
  `handlebars` and `mustache` are also supported.
  
## A note regarding JST templates and strict mode

If you use strict mode in your app and JST templates the default grunt-jst implementation will cause your app to error out as the templates will be precompiled using a 'with' statement.

This can be addressed by changing the jst grunt task as follows:

```
jst: {
    compile: {
        options:
        {
            templateSettings:
            {
                variable: 'data'
            }
        },
        files: {
            '.tmp/scripts/templates.js': ['<%= yeoman.app %>/scripts/templates/*.ejs']
        }
    }
},
```
A result of this change is that your template variable definitions must also be updated from `<%= templateVariable %>` to `<%= data.templateVariable %>`. More information on this can be found in the [Underscore documentation](http://underscorejs.org/#template).

## Contribute

See the [contributing docs](https://github.com/yeoman/yeoman/blob/master/contributing.md)

When submitting an issue, please follow the [guidelines](https://github.com/yeoman/yeoman/blob/master/contributing.md#issue-submission). Especially important is to make sure Yeoman is up-to-date, and providing the command or commands that cause the issue.

When submitting a bugfix, write a test that exposes the bug and fails before applying your fix. Submit the test alongside the fix.

When submitting a new feature, add tests that cover the feature.


## License

[BSD license](http://opensource.org/licenses/bsd-license.php)
