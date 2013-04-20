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


## Options

* `--skip-install`

  Skips the automatic execution of `bower` and `npm` after
  scaffolding has finished.

* `--test-framework=[framework]`

  Defaults to `mocha`. Can be switched for
  another supported testing framework like `jasmine`.

* `--template-framework=[framework]`

  Defaults to `lodash` templating with grunt-contrib-jst.
  `handlebars` and `mustache` are also supported.

## Contribute

See the [contributing docs](https://github.com/yeoman/yeoman/blob/master/contributing.md)

When submitting an issue, please follow the [guidelines](https://github.com/yeoman/yeoman/blob/master/contributing.md#issue-submission). Especially important is to make sure Yeoman is up-to-date, and providing the command or commands that cause the issue.

When submitting a bugfix, write a test that exposes the bug and fails before applying your fix. Submit the test alongside the fix.

When submitting a new feature, add tests that cover the feature.


## License

[BSD license](http://opensource.org/licenses/bsd-license.php)
