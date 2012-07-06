module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    concat: {
      dist: {
        src: [
          '<banner:meta.banner>',
          'vendor/zepto.js',
          'vendor/almond.js',
          //'<file_strip_banner:dist/app.js>'
          '<file_strip_banner:dist/coffee.js>'
        ],
        dest: 'dist/app.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'dist/app.js'
      }
    },
    lint: {
      files: ['grunt.js', 'lib/app/**/*.js']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint test'
    },
    coffee: {
      compile: {
        files: {
          'dist/coffee.js': 'lib/app/**/*.coffee'
        }
      }
    },
    jshint: {
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
        eqnull: true
      },
      globals: {
        exports: true,
        define: true,
        require: true,
        module: false,
        $: true
      }
    },
    uglify: {},
    jasmine: {
      index: ['lib/test/SpecRunner.html']
    },
    requirejs: {
      //almond: true,
      //appDir: 'lib',
      baseUrl: './lib',
      //dir: 'dist',
      name: 'app/app',
      out: "dist/app.js",
      //modules: [{name: 'app'}],
      shim: {
        zepto: {
          exports: "$"
        }
      },
      deps: [ 'zepto' ],
      paths: {
        zepto: '../vendor/zepto'
        //underscore: '../vendor/underscore',
        //almond: '../vendor/almond',
        //jquery    : '../vendor/jquery-1.7.1.min'//,
        //backbone  : '../vendor/backbone'
      },
      replaceRequireScript: [{
        files: ['build/index.html'],
        module: 'main'
      }],
      pragmas: {
        doExclude: true
      },
      skipModuleInsertion: false,
      //optimizeAllPluginResources: true,
      findNestedDependencies: true,
      wrap: true,
      optimize: "none"
    },
    jade: {
      compile: {
        files: {
          'dist/index.html': 'views/**/*.jade'
        }
      }
    },
    stylus: {
      compile: {
        options: {
          compress: true
        },
        files: {
          "dist/stylesheets/app.css": "stylus/global.styl"
        }
      }
    },
    clean: [ "dist" ]
  });

  // Load custom tasks.
  // grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib');
  grunt.loadNpmTasks('grunt-jasmine-task');
  grunt.loadNpmTasks('grunt-requirejs');

  // Default task.
  grunt.registerTask('default', 'lint jasmine clean coffee concat min jade stylus');

};
