/*global require*/
'use strict';

require.config({
    shim: {<% if (compassBootstrap) { %>
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }<% } %><% if (templateFramework === 'handlebars') { %>,
        handlebars: {
            exports: 'Handlebars'
        }<% } %>
    },
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/lodash/dist/lodash'<% if (compassBootstrap) { %>,
        bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap'<% } %><% if (templateFramework === 'handlebars') { %>,
        handlebars: '../bower_components/handlebars/handlebars'<% } %><% if (templateFramework === 'mustache') { %>,
        hogan: '../bower_components/hogan/web/builds/2.0.0/hogan-2.0.0.amd',<% } %>
    }
});

require([
    'backbone'
], function (Backbone) {
    Backbone.history.start();
});
