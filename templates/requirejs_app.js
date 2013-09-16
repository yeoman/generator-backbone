/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        }<% if (compassBootstrap) { %>,
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }<% } %><% if (templateFramework === 'handlebars') { %>,
        handlebars: {
            exports: 'Handlebars'
        }<% } %>
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore'<% if (compassBootstrap) { %>,
        bootstrap: 'vendor/bootstrap'<% } %><% if (templateFramework === 'handlebars') { %>,
        handlebars: '../bower_components/handlebars/handlebars'<% } %>
    }
});

require([
    'backbone',
    'router',
    'app_config'
], function (Backbone, ApplicationRouter, AppConfig) {
    var router = new ApplicationRouter;

    Backbone.history.start();
});
