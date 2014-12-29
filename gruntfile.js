module.exports = function(grunt){
    grunt.initConfig({
        less: {
            // 编译
            compile: {
                files: {
                    'public/css/common.css': 'public/less/common.less',
                    'public/css/appindex.css': 'public/less/appindex.less',
                    'public/css/appdetail.css': 'public/less/appdetail.less'
                }
            },
            // 压缩
            yuicompress: {
                files: {
                    'public/css/common-min.css': 'public/css/common.css',
                    'public/css/appindex-min.css': 'public/css/appindex.css',
                    'public/css/appdetail-min.css': 'public/css/appdetail.css'
                },
                options: {
                    yuicompress: true
                }
            }
        },
        watch: {
            jade: {
                files: ['views/**'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['public/js/**', 'models/**/*.js', 'schemas/**/*.js'],
                options: {
                    livereload: true
                }
            },
            scripts: {
                files: ['public/less/*.less'],
                tasks: ['less']
            }
        },

        nodemon: {
            dev: {
                script: 'app.js',
                options: {
                    args: [],
                    ignore: ['README.md', 'node_modules/**', 'DS_Store'],
                    ext: 'js',
                    watch: ['./'],
                    nodeArgs: ['--debug'],
                    delay: 1000,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            }
        },

        concurrent: {
            tasks: ['less','nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.option('force',true);
    grunt.registerTask('default',['less','concurrent']);
}