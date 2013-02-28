'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function( grunt ) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // configurable paths
  var yeomanConfig = {
      app: 'app',
      dist: 'dist'
  };
  //
  // Grunt configuration:
  //
  // https://github.com/cowboy/grunt/blob/master/docs/getting_started.md
  //
  grunt.initConfig({
      yeoman:yeomanConfig,
      // Project configuration
      // ---------------------
      watch: {
        coffee: {
            files: ['<%%= yeoman.app %>/scripts/{,*/}*.coffee'],
            tasks: ['coffee:dist']
        },
        coffeeTest: {
            files: ['test/spec/{,*/}*.coffee'],
            tasks: ['coffee:test']
        },
        compass: {
            files: ['<%%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
            tasks: ['compass']
        },
        livereload: {
            files: [
                '<%%= yeoman.app %>/*.html',
                '{.tmp,<%%= yeoman.app %>}/styles/{,*/}*.css',
                '{.tmp,<%%= yeoman.app %>}/scripts/{,*/}*.js',
                '<%%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,webp}'
            ],
            tasks: ['livereload']
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
                        mountFolder(connect, 'app')
                    ];
                }
            }
        },
        test: {
            options: {
                middleware: function (connect) {
                    return [
                        mountFolder(connect, '.tmp'),
                        mountFolder(connect, 'test')
                    ];
                }
            }
        },
        dist: {
            options: {
                middleware: function (connect) {
                    return [
                        mountFolder(connect, 'dist')
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
        server: '.tmp'
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
    },
    mocha: {
        all: {
            options: {
                run: true,
                urls: ['http://localhost:<%%= connect.options.port %>/index.html']
            }
        }
    },
    coffee: {
        dist: {
            files: [{
                // rather than compiling multiple files here you should
                // require them into your main .coffee file
                expand: true,
                cwd: '<%%= yeoman.app %>/scripts',
                src: '*.coffee',
                dest: '.tmp/scripts',
                ext: '.js'
            }]
        },
        test: {
            files: [{
                expand: true,
                cwd: '.tmp/spec',
                src: '*.coffee',
                dest: 'test/spec'
            }]
        }
    },
    compass: {
        options: {
            sassDir: '<%%= yeoman.app %>/styles',
            cssDir: '.tmp/styles',
            imagesDir: '<%%= yeoman.app %>/images',
            javascriptsDir: '<%%= yeoman.app %>/scripts',
            fontsDir: '<%%= yeoman.app %>/styles/fonts',
            importPath: 'app/components',
            relativeAssets: true
        },
        dist: {},
        server: {
            options: {
                debugInfo: true
            }
        }
    },

    // generate application cache manifest
    manifest:{
      dest: ''
    },

    // default lint configuration, change this to match your setup:
    // https://github.com/cowboy/grunt/blob/master/docs/task_lint.md#lint-built-in-task
    lint: {
      options: {
        // specifying JSHint options and globals
        options: {
          curly: true,
          eqeqeq: true,
          immed: true,
          latedef: true,
          newcap: true,
          noarg: true,
          sub: true,
          undef: true,
          boss: true,
          eqnull: true,
          browser: true
        },
        globals: {
          jQuery: true
        }
      },
      files: [
        'Gruntfile.js',
        'app/scripts/**/*.js',
        'test/**/*.js'
      ]
    },

    // Build configuration
    // -------------------

    // the staging directory used during the process
    staging: 'temp',
    // final build output
    output: 'dist',

    mkdirs: {
      staging: 'app/'
    },

    // Below, all paths are relative to the staging directory, which is a copy
    // of the app/ directory. Any .gitignore, .ignore and .buildignore file
    // that might appear in the app/ tree are used to ignore these values
    // during the copy process.

    // concat css/**/*.css files, inline @import, output a single minified css
    css: {
      'styles/main.css': ['styles/**/*.css']
    },

    // renames JS/CSS to prepend a hash of their contents for easier
    // versioning
    rev: {
      js: 'scripts/**/*.js',
      css: 'styles/**/*.css',
      img: 'images/**'
    },

    // usemin handler should point to the file containing
    // the usemin blocks to be parsed
    'usemin-handler': {
      html: 'index.html'
    },

    // update references in HTML/CSS to revved files
    usemin: {
      html: ['**/*.html'],
      css: ['**/*.css']
    },

    // HTML minification
    html: {
      files: ['**/*.html']
    },

    // Optimizes JPGs and PNGs (with jpegtran & optipng)
    img: {
      dist: '<config:rev.img>'
    },

    // rjs configuration. You don't necessarily need to specify the typical
    // `path` configuration, the rjs task will parse these values from your
    // main module, using http://requirejs.org/docs/optimization.html#mainConfigFile
    //
    // name / out / mainConfig file should be used. You can let it blank if
    // you're using usemin-handler to parse rjs config from markup (default
    // setup)
    rjs: {
      // no minification, is done by the min task
      optimize: 'none',
      baseUrl: './scripts',
      wrap: true
    },
  });

  grunt.renameTask('regarde', 'watch');

  grunt.registerTask('server', function (target) {
      if (target === 'dist') {
          return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
      }

      grunt.task.run([
          'clean:server',
          'coffee:dist',
          'compass:server',
          'livereload-start',
          'connect:livereload',
          'open',
          'watch'
      ]);
  });

  grunt.registerTask('test', [
      'clean:server',
      'coffee',
      'compass',
      'connect:test',
      'mocha'
  ]);

  grunt.registerTask('build', [
      'clean:dist',
      'coffee',
      'compass:dist',
      'useminPrepare',
      'imagemin',
      'htmlmin',
      'concat',
      'cssmin',
      'uglify',
      'copy',
      'usemin'
  ]);

  grunt.registerTask('default', [
      'jshint',
      'test',
      'build'
  ]);


};
