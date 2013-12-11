module.exports = function(grunt) {

  // config
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        options: {
          style: 'nested'
        },
        files: {
          'css/build/global.css': 'css/global.scss'
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 version']
      },
      single_file: {
        src: 'css/build/global.css',
        dest: 'css/build/prefixed/global.css'
      }
    },

    cssmin: {
      combine: {
        files: {
          'css/build/global.css': ['css/build/prefixed/global.css'] 
        }
      }
    },

    jshint: {
      beforeconcat: ['js/*.js']
    },

    concat: {
      dist: {
        src: [
          'js/libs/*.js',
          'js/global.js'
        ],
        dest: 'js/build/production.js'
      }
    },

    uglify: {
      build: {
        src: [
          'js/build/production.js',
          'js/build/production.min.js'
        ],
        dest: 'js/build/global.min.js'
      }
    },

    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'images/'
        }]
      }
    },

    watch: {
      files: ['*.html', '*.php'],
      options: {
        livereload: true
      },
      scripts: {
        files: ['js/*.js'],
        tasks: ['concat', 'uglify', 'jshint'],
        options: {
          spawn: false
        }
      },
      css: {
        files: ['css/*.scss'],
        tasks: ['sass', 'autoprefixer', 'cssmin'],
        options: {
          spawn: false
        }
      },
      images: {
        files: ['img/**/*.{png,jpg,gif}', 'img/*.{png,jpg,gif}'],
        tasks: ['imagemin'],
        options: {
          spawn: false
        }
      }
    }

  });

  require('load-grunt-tasks')(grunt);
  grunt.registerTask('default', [
    'autoprefixer',
    'concat',
    'cssmin',
    'imagemin',
    'jshint',
    'sass',
    'uglify',
    'watch'
  ]);

};