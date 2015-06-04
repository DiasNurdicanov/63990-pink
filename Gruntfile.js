module.exports = function(grunt) {

  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    less: {
      style: {
        files: {
          'build/css/style.css': 'source/less/style.less'
        }
      }
    },

    sass: {
      style: {
        files: {
          'css/style.css': 'sass/style.scss'
        }
      }
    },

    lintspaces: {
      test: {
        src: [
          '*.html',
          'js/*.js',
          'less/*.less',
          'sass/*.sass'
        ],
        options: {
          editorconfig: '.editorconfig'
        }
      }
    },

    githooks: {
      test: {
        'pre-commit': 'lintspaces:test',
      }
    },

    autoprefixer:{
      options:{
        browers: ["last 2 version", "ie 10"]
      },
      style: {
        src: "build/css/style.css"
      }
    },

    cssmin: {
      style: {
        options: {
          keepSpecialComments: 0,
          report: "gzip"
        },
        files: {
          "build/css/style.min.css": ["build/css/style.css"]
        }
      }
    },

    imagemin: { 
      images: { 
        options: { 
          optimizationLevel: 3 
        }, 
        files: [{ 
          expand: true, 
          src: ["build/img/**/*.{png,jpg,gif,svg}"] 
        }] 
      } 
    },

    copy: {
      gosha: {
        files: [{
          expand: true,
          src: [
            '*.html',
            'css/**',
            'img/**',
            'js/**'
          ],
          dest: 'gosha',
        }]
      }
    },

    copy: { 
      build: { 
        files: [{ 
          expand: true, 
          cwd: "source", 
          src: [ 
            "img/**", 
            "js/**", 
            "*.html" 
          ], 
          dest: "build" 
        }] 
      }
    },

    clean: {
      gosha: [
        'gosha/img/README',
        'gosha/js/README'
      ]
    },

    clean: { 
      build: ["build"]
    }
  });

  grunt.registerTask('test', ['lintspaces:test']);

  if (grunt.file.exists(__dirname, 'less', 'style.less')) {
    grunt.registerTask('gosha', ['less:style', 'copy:gosha', 'clean:gosha']);
  } else if (grunt.file.exists(__dirname, 'sass', 'style.scss')) {
    grunt.registerTask('gosha', ['sass:style', 'copy:gosha', 'clean:gosha']);
  } else {
    grunt.registerTask('gosha', ['copy:gosha', 'clean:gosha']);
  }

  grunt.registerTask("build", [
    "clean",
    "copy",
    "less",
    "autoprefixer",
    "cssmin",
    "imagemin"
  ]);
};
