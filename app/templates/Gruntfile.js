'use strict';
var LIVERELOAD_PORT = 35729;
var SERVER_PORT = 9000;
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

  // Automatically load required Grunt tasks
  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin'
  });

  // configurable paths
  var yeomanConfig = {
    app: '<%= env.options.appPath %>',
    dist: 'dist'
  };

  grunt.initConfig({
    yeoman: yeomanConfig,
    watch: {
      options: {
        nospawn: true,
        livereload: LIVERELOAD_PORT
      },<% if (options.coffee) { %>
      coffee: {
        files: ['<%%= yeoman.app %>/scripts/{,*/}*.coffee'],
        tasks: ['coffee:dist']
      },
      coffeeTest: {
        files: ['test/spec/{,*/}*.coffee'],
        tasks: ['coffee:test']
      },<% } %><% if (sassBootstrap) { %>
      sass: {
        files: ['<%%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['sass:server']
      },<% } %>
      livereload: {
        options: {
          livereload: grunt.option('livereloadport') || LIVERELOAD_PORT
        },
        files: [
          '<%%= yeoman.app %>/*.html',
          '{.tmp,<%%= yeoman.app %>}/styles/{,*/}*.css',
          '{.tmp,<%%= yeoman.app %>}/scripts/{,*/}*.js',
          '<%%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
          '<%%= yeoman.app %>/scripts/templates/*.{ejs,mustache,hbs}',
          'test/spec/**/*.js'
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
      }<% } %>,
      test: {
        files: ['<%%= yeoman.app %>/scripts/{,*/}*.js', 'test/spec/**/*.js'],
        tasks: ['test:true']
      }
    },
    connect: {
      options: {
        port: grunt.option('port') || SERVER_PORT,
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
              mountFolder(connect, 'test'),
              lrSnippet,
              mountFolder(connect, '.tmp'),
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
      },
      test: {
        path: 'http://localhost:<%%= connect.test.options.port %>'
      }
    },
    clean: {
      dist: ['.tmp', '<%%= yeoman.dist %>/*'],
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
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
          urls: ['http://localhost:<%%= connect.test.options.port %>/index.html']
        }
      }
    }<% } else { %>,
    jasmine: {
      all:{
        src : '<%= yeoman.app %>/scripts/{,*/}*.js',
        options: {
          keepRunner: true,
          specs : 'test/spec/**/*.js',
          vendor : [
            '<%%= yeoman.app %>/bower_components/jquery/dist/jquery.js',
            '<%%= yeoman.app %>/bower_components/lodash/dist/lodash.js',
            '<%%= yeoman.app %>/bower_components/backbone/backbone.js',
            '.tmp/scripts/templates.js'
          ]
        }
      }
    }<% } %>,<% if (options.coffee) { %>
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
    },<% } %><% if (sassBootstrap) { %>
    sass: {
      options: {
        sourceMap: true,
        includePaths: ['app/bower_components']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/styles',
          src: ['*.{scss,sass}'],
          dest: '.tmp/styles',
          ext: '.css'
        }]
      },
      server: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/styles',
          src: ['*.{scss,sass}'],
          dest: '.tmp/styles',
          ext: '.css'
        }]
      }
    },<% } %><% if (includeRequireJS) { %>
    requirejs: {
      dist: {
        // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
        options: {
          almond: true,

          replaceRequireScript: [{
              files: ['<%%= yeoman.dist %>/index.html'],
              module: 'main'
          }],

          modules: [{name: 'main'}],
          <% if (options.coffee) { %>
          baseUrl: '.tmp/scripts',<% } else { %>
          baseUrl: '<%%= yeoman.app %>/scripts',<% } %>
          mainConfigFile: '<%%= yeoman.app %>/scripts/main.js', // contains path specifications and nothing else important with respect to config
          dir: '.tmp/scripts',

          optimize: 'none', // optimize by uglify task
          useStrict: true<% if (templateFramework !== 'handlebars') { %>,
          wrap: true<% } %>
        }
      }
    },
    uglify: {
      dist: {
        files: {
          '<%%= yeoman.dist %>/scripts/main.js': [
            '.tmp/scripts/main.js'
          ]
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
      css: ['<%%= yeoman.dist %>/styles/{,*/}*.css'],
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
          '<%%= yeoman.dist %>/styles/main.css': [
            '.tmp/styles/{,*/}*.css',
            '<%%= yeoman.app %>/styles/{,*/}*.css'
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
            'images/{,*/}*.{webp,gif}',
            'styles/fonts/{,*/}*.*',<% if (sassBootstrap) { %>
            'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*.*'<% } %>
          ]
        }, {
          src: 'node_modules/apache-server-configs/dist/.htaccess',
          dest: '<%%= yeoman.dist %>/.htaccess'
        }]
      }
    },<% if (includeRequireJS) { %>
    bower: {
      all: {
        rjsConfig: '<%%= yeoman.app %>/scripts/main.js'
      }
    },<% } %><% if (templateFramework === 'mustache') { %>
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
            '<%%= yeoman.dist %>/styles/{,*/}*.css',
            '<%%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
            '<%= yeoman.dist %>/styles/fonts/{,*/}*.*',<% if (sassBootstrap) { %>
            'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*.*'<% } %>
          ]
        }
      }
    }
  });

  grunt.registerTask('createDefaultTemplate', function () {
    grunt.file.write('.tmp/scripts/templates.js', 'this.JST = this.JST || {};');
  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve' + (target ? ':' + target : '')]);
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open:server', 'connect:dist:keepalive']);
    }

    if (target === 'test') {
      return grunt.task.run([
        'clean:server',<% if (options.coffee) { %>
        'coffee',<% } %>
        'createDefaultTemplate',<% if (templateFramework === 'mustache' ) { %>
        'mustache',<% } else if (templateFramework === 'handlebars') { %>
        'handlebars',<% } else { %>
        'jst',<% } %><% if (sassBootstrap) { %>
        'sass:server',<% } %>
        'connect:test',
        'open:test',
        'watch'
      ]);
    }

    grunt.task.run([
      'clean:server',<% if (options.coffee) { %>
      'coffee:dist',<% } %>
      'createDefaultTemplate',<% if (templateFramework === 'mustache') { %>
      'mustache',<% } else if (templateFramework === 'handlebars') { %>
      'handlebars',<% } else { %>
      'jst',<% } %><% if (sassBootstrap) { %>
      'sass:server',<% } %>
      'connect:livereload',
      'open:server',
      'watch'
    ]);
  });

  grunt.registerTask('test', function (isConnected) {
    isConnected = Boolean(isConnected);
    var testTasks = [
        'clean:server',<% if (options.coffee) { %>
        'coffee',<% } %>
        'createDefaultTemplate',<% if (templateFramework === 'mustache' ) { %>
        'mustache',<% } else if (templateFramework === 'handlebars') { %>
        'handlebars',<% } else { %>
        'jst',<% } %><% if (sassBootstrap) { %>
        'sass',<% } %><% if(testFramework === 'mocha') { %>
        'connect:test',
        'mocha',<% } else { %>
        'jasmine'<% } %>
      ];

    if(!isConnected) {
      return grunt.task.run(testTasks);
    } else {
      // already connected so not going to connect again, remove the connect:test task
      testTasks.splice(testTasks.indexOf('connect:test'), 1);
      return grunt.task.run(testTasks);
    }
  });

  grunt.registerTask('build', [
    'clean:dist',<% if (options.coffee) { %>
    'coffee',<% } %>
    'createDefaultTemplate',<% if (templateFramework === 'mustache' ) { %>
    'mustache',<% } else if (templateFramework === 'handlebars') { %>
    'handlebars',<% } else { %>
    'jst',<% } %><% if (sassBootstrap) { %>
    'sass:dist',<% } %>
    'useminPrepare',
    'imagemin',
    'htmlmin',
    'concat',
    'cssmin',
    'uglify:generated',
    'copy',<% if (includeRequireJS) { %>
    'requirejs',<% } %>
    'uglify:dist',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'test',
    'build'
  ]);
};
