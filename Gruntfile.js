// Master Grunt Gruntfile.js adaoted for the projectgit
// Author: Guillaume Simler (for more info please check my Github Profile)
// Configured in March 2013


module.exports = function(grunt) {

    // 1. configuration starts here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // 2. add your plug-ins' config here below

        cssmin: {
             target: {
                files: [{
                    expand: true,
                    cwd: 'src/css/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dir/css/',
                    ext: '.min.css'
            }]
          }
        },

        // inline CSS

        inlinecss: {
            main: {
                options: {
                },
                files: {
                'dir/index.html': 'src/index.html'
                }
            }
        },

        // Minify HTML

        htmlmin: {                                     // Task
            dist: {                                      // Target
                options: {                                 // Target options
                removeComments: true,
                collapseWhitespace: true
                },
          
                // Dictionary of files
                files: {                                   
                    'dir/index.html': 'dir/index.html'        // 'destination': 'source'
                }
            }
        }, 

        // Responsive imagine

        responsive_images: {
            dev: {
                options: {
                    engine: 'im',
                    sizes: [
                        {
                            width: 400,
                            quality: 50
                        }
                    ]
                },
            
                files: [{
                  expand: true,
                  src: ['pizzeria.jpg'],
                  cwd: 'src/views/images/',
                  dest: 'src/views/images/'
                }]
            }
        },
        

        // Minify images
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/views/images/',
                    src: ['**/*.{png,jpg,gif,JPG,GIF,PNG}'],
                    dest: 'src/views/images/'
                }]
            }
        },

        // Minify Javascript
        uglify: {
            my_target: {
                files: [{
                    expand: true,
                    cwd: 'src/js/',
                    src: '**/*.js',
                    dest: 'dir/js/'
                }]
            }
        },


        // Housekeeping functions

        clean: {
            dev: {
                src: ['dir/images'],
            }
        },

        mkdir: {
            all: {
                options: {
                    create: ['dir/js', 'dir/css', 'dir/images','dir/views/images/']
                }
            }
        }

    });

    // 3. load your plug-ins
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-inline-css');
    grunt.loadNpmTasks('grunt-responsive-images');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-mkdir');

    // 4. progran starter (don't forget to add the plugin)
    grunt.registerTask('default', ['mkdir', 'responsive_images', 'imagemin']);

};