'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'
// templateFramework: '<%= templateFramework %>'

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };

    grunt.initConfig({
        envconfig: {},
        pkg: grunt.file.readJSON('package.json'),
        yeoman: yeomanConfig,
        watch: {
            options: {
                nospawn: true
            },
            coffee: {
                files: ['<%%= yeoman.app %>/scripts/{,*/}*.coffee'],
                tasks: ['coffee:dist']
            },
            coffeeTest: {
                files: ['test/spec/{,*/}*.coffee'],
                tasks: ['coffee:test']
            },
            compass: {
                files: ['<%%= yeoman.app %>/css/{,*/}*.{scss,sass}'],
                tasks: ['compass']
            },
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    '<%%= yeoman.app %>/*.html',
                    '{.tmp,<%%= yeoman.app %>}/css/{,*/}*.css',
                    '{.tmp,<%%= yeoman.app %>}/scripts/{,*/}*.js',
                    '<%%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                    '<%%= yeoman.app %>/scripts/templates/*.{ejs,mustache,hbs}'
                ]
            }<% if (templateFramework === 'mustache') { %>,
            mustache: {
                files: [
                    '<%%= yeoman.app %>/scripts/templates/*.mustache'
                ],
                tasks: ['mustache']
            }<% } else if (templateFramework === 'handlebars') { %>,
            handlebars: {
                files: [
                    '<%%= yeoman.app %>/scripts/templates/*.hbs'
                ],
                tasks: ['handlebars']
            }<% } else { %>,
            jst: {
                files: [
                    '<%%= yeoman.app %>/scripts/templates/*.ejs'
                ],
                tasks: ['jst']
            }<% } %><% if (testFramework === 'jasmine') { %>,
            test: {
                files: ['<%%= yeoman.app %>/scripts/{,*/}*.js', 'test/spec/**/*.js'],
                tasks: ['test']
            }<% } %>,
            "replace:dev": {
                files: [
                    "!.tmp/scripts/app_config.js",
                    "config/*.json",
                    "config/app_config.js"
                ],
                tasks: ['replace:dev'],
                options: {
                    nospawn: true
                }
            }
        },
        connect: {
            options: {
                port: 9000,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            test: {
                options: {
                    port: 9001,
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'test'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, yeomanConfig.dist)
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%%= connect.options.port %>'
            }
        },
        clean: {
            dist: ['.tmp', '<%%= yeoman.dist %>/*'],
            server: ['.tmp','app/scripts/app_config.js'],
            buildcomplete: 'app/scripts/app_config.js'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%%= yeoman.app %>/scripts/{,*/}*.js',
                '!<%%= yeoman.app %>/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        }<% if (testFramework === 'mocha') { %>,
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://localhost:<%%= connect.options.port %>/index.html']
                }
            }
        }<% } else { %>,
        jasmine: {
            all:{
                src : '.tmp/scripts/combined-scripts.js',
                options: {
                    keepRunner: true,
                    specs : 'test/spec/**/*.js',
                    vendor : [
                        '<%%= yeoman.app %>/bower_components/jquery/jquery.js',
                        '<%%= yeoman.app %>/bower_components/underscore/underscore.js',
                        '<%%= yeoman.app %>/bower_components/backbone/backbone.js'
                    ]
                }
            }
        }<% } %>,
        coffee: {
            dist: {
                files: [{
                    // rather than compiling multiple files here you should
                    // require them into your main .coffee file
                    expand: true,
                    cwd: '<%%= yeoman.app %>/scripts',
                    src: '{,*/}*.coffee',
                    dest: '.tmp/scripts',
                    ext: '.js'
                }]
            },
            test: {
                files: [{
                    expand: true,
                    cwd: 'test/spec',
                    src: '{,*/}*.coffee',
                    dest: '.tmp/spec',
                    ext: '.js'
                }]
            }
        },
        compass: {
            options: {
                sassDir: '<%%= yeoman.app %>/css',
                cssDir: '.tmp/css',
                imagesDir: '<%%= yeoman.app %>/images',
                javascriptsDir: '<%%= yeoman.app %>/scripts',
                fontsDir: '<%%= yeoman.app %>/css/fonts',
                importPath: '<%%= yeoman.app %>/bower_components',
                relativeAssets: true
            },
            dist: {},
            server: {
                options: {
                    debugInfo: true
                }
            }
        },<% if (includeRequireJS) { %>
        requirejs: {
            dist: {
                // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
                options: {
                    // `name` and `out` is set by grunt-usemin
                    baseUrl: '<%%= yeoman.app %>/scripts',
                    optimize: 'none',
                    paths: {
                        'templates': '../../.tmp/scripts/templates'
                    },
                    // TODO: Figure out how to make sourcemaps work with grunt-usemin
                    // https://github.com/yeoman/grunt-usemin/issues/30
                    //generateSourceMaps: true,
                    // required to support SourceMaps
                    // http://requirejs.org/docs/errors.html#sourcemapcomments
                    preserveLicenseComments: false,
                    useStrict: true<% if (templateFramework !== 'handlebars') { %>,
                    wrap: true<% } %>
                    //uglify2: {} // https://github.com/mishoo/UglifyJS2
                }
            }
        },<% } else { %>
        // not enabled since usemin task does concat and uglify
        // check index.html to edit your build targets
        // enable this task if you prefer defining your build targets here
        /*uglify: {
            dist: {}
        },*/<% } %>
        useminPrepare: {
            html: '<%%= yeoman.app %>/index.html',
            options: {
                dest: '<%%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%%= yeoman.dist %>/css/{,*/}*.css'],
            options: {
                dirs: ['<%%= yeoman.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%%= yeoman.dist %>/images'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%%= yeoman.dist %>/css/main.css': [
                        '.tmp/css/{,*/}*.css',
                        '<%%= yeoman.app %>/css/{,*/}*.css'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.app %>',
                    src: '*.html',
                    dest: '<%%= yeoman.dist %>'
                }]
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%%= yeoman.app %>',
                    dest: '<%%= yeoman.dist %>',
                    src: [
                        '*.{ico,txt}',
                        '.htaccess',
                        'images/{,*/}*.{webp,gif}',
                        'fonts/*'
                    ]
                }]
            }
        },
        bower: {
            all: {
                rjsConfig: '<%%= yeoman.app %>/scripts/main.js'
            }
        },<% if (templateFramework === 'mustache') { %>
        mustache: {
            files: {
                src: '<%%= yeoman.app %>/scripts/templates/',
                dest: '.tmp/scripts/templates.js',
                options: {<% if (includeRequireJS) { %>
                    prefix: 'define(function() { this.JST = ',
                    postfix: '; return this.JST;});'<% } else { %>
                    prefix: 'this.JST = ',
                    postfix: ';'<% } %>
                }
            }
        }<% } else if (templateFramework === 'handlebars') { %>
        handlebars: {
            compile: {
                options: {
                    namespace: 'JST'<% if (includeRequireJS) { %>,
                    amd: true<% } %>
                },
                files: {
                    '.tmp/scripts/templates.js': ['<%%= yeoman.app %>/scripts/templates/*.hbs']
                }
            }
        }<% } else { %>
        jst: {<% if (includeRequireJS) { %>
            options: {
                amd: true
            },<% } %>
            compile: {
                files: {
                    '.tmp/scripts/templates.js': ['<%%= yeoman.app %>/scripts/templates/*.ejs']
                }
            }
        }<% } %>,
        rev: {
            dist: {
                files: {
                    src: [
                        '<%%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%%= yeoman.dist %>/css/{,*/}*.css',
                        '<%%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                        '<%%= yeoman.dist %>/css/fonts/*'
                    ]
                }
            }
        },
        replace: {
            options: {
                variables: {}
            },
            dist: {
                files: [
                    { expand: true, flatten: true, src: ['config/app_config.js'], dest: 'app/scripts' }
                ]
            },
            dev: {
                files: [
                    { expand: true, flatten: true, src: ['config/app_config.js'], dest: '.tmp/scripts' }
                ]
            }
        },
        strip : {
            all : {
                src : 'dist/scripts/*.js',
                options : {
                    nodes : ['console.log', 'debug'],
                    inline: true
                }
            }
        }
    });

    grunt.registerTask('createDefaultTemplate', function () {
        grunt.file.write('.tmp/scripts/templates.js', 'this.JST = this.JST || {};');
    });

    grunt.registerTask('envconfig', function(target) {
        var target = typeof target == "undefined" ? "dev" : target;

        console.log("TARGET ENV: "+target);

        var envconfig = grunt.file.readJSON('config/'+target+'.json');

        // Get 'version' from package.json
        envconfig.version = grunt.config('pkg').version;

        grunt.config.set('envconfig', envconfig);

        grunt.config.set('replace.options.variables', envconfig)
        grunt.task.run(['replace:'+target]);
    });

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        } else if (target === 'test') {
            return grunt.task.run([
                'clean:server',
                'coffee',
                'createDefaultTemplate',<% if (templateFramework === 'mustache' ) { %>
                'mustache',<% } else if (templateFramework === 'handlebars') { %>
                'handlebars',<% } else { %>
                'jst',<% } %>
                'compass:server',
                'connect:test:keepalive'
            ]);
        }

        grunt.task.run([
            'clean:server',
            'envconfig:dev',
            'coffee:dist',
            'createDefaultTemplate',<% if (templateFramework === 'mustache') { %>
            'mustache',<% } else if (templateFramework === 'handlebars') { %>
            'handlebars',<% } else { %>
            'jst',<% } %>
            'compass:server',
            'connect:livereload',
            'open',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'envconfig:dev',
        'coffee',
        'createDefaultTemplate',<% if (templateFramework === 'mustache' ) { %>
        'mustache',<% } else if (templateFramework === 'handlebars') { %>
        'handlebars',<% } else { %>
        'jst',<% } %>
        'compass',<% if(testFramework === 'mocha') { %>
        'connect:test',
        'mocha'<% } else { %>
        'jasmine',
        'watch:test'<% } %>
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'envconfig:dist',
        'coffee',
        'createDefaultTemplate',<% if (templateFramework === 'mustache' ) { %>
        'mustache',<% } else if (templateFramework === 'handlebars') { %>
        'handlebars',<% } else { %>
        'jst',<% } %>
        'compass:dist',
        'useminPrepare',<% if (includeRequireJS) { %>
        'requirejs',<% } %>
        'imagemin',
        'htmlmin',
        'concat',
        'cssmin',
        'uglify',
        'copy',
        'rev',
        'usemin',
        'clean:buildcomplete'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);
};
