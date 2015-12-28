'use strict';

var fs = require('fs');

module.exports = function (grunt) {
  // js targets
  var projectJsFiles = [
    './Gruntfile.js',
    './app/controllers/**/*.js',
    './app/genControllers/**/*.js',
    './app/genModels/**/*.js',
    './app/mailer/index.js',
    './app/models/**/*.js',
    './app/modelTemplates/articleTemp.js',
    './config/**/*.js',
    './configLib/**/*.js',
    './lib/**/*.js',
    './test/**/*.js'
  ];

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jsvalidate: {
      options: {
        globals: {},
        esprimaOptions: {},
        verbose: false
      },
      targetName: {
        files: {
          src: ['<%=jshint.all%>']
        }
      }
    },

    jsbeautifier: {
      modify: {
        src: ['<%=jshint.all%>'],
        options: {
          config: '.jsbeautifyrc'
        }
      },
      verify: {
        src: ['<%=jshint.all%>'],
        options: {
          mode: 'VERIFY_ONLY',
          config: '.jsbeautifyrc'
        }
      }
    },

    jscs: {
      options: {
        config: '.jscsrc'
      },
      files: ['<%=jshint.all%>']
    },

    jshint: { // Explanations at http://jslinterrors.com/
      all: projectJsFiles,
      options: {
        jshintrc: '.jshintrc' // relative to Gruntfile
      }
    }
  });

  // Load the plugins
  require('load-grunt-tasks')(grunt, {
    scope: 'devDependencies'
  });
  require('time-grunt')(grunt);

  // task(s).

  // clean
  grunt.registerTask('clean', [
    'jsvalidate',
    'jshint',
    'jsbeautifier:verify',
    'jscs'
  ]);

  grunt.registerTask('format', ['jsbeautifier:modify']);
};
