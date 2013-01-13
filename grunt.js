module.exports = function (grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        test: {
            files: ['test/**/*.js']
        },
        lint: {
            files: ['grunt.js', 'tasks/**/*.js', 'test/**/*.js']
        },
        watch: {
            files: '<config:lint.files>',
            tasks: 'default'
        },
        jshint: {
            options: {
                // Enforcing Options
                bitwise: true,
                //camelcase: true,
                curly: true,
                eqeqeq: true,
                forin: true,
                immed: true,
                indent: 4,
                latedef: true,
                newcap: true,
                noarg: true,
                noempty: true,
                quotmark: 'single',
                undef: true,
                //unused: true,
                strict: true,
                trailing: true,
                maxparams: 7,
                maxdepth: 4,
                maxstatements: 50,
                maxcomplexity: 5,
                // Relaxing Options
                //sub: true,
                //boss: true,
                //eqnull: true,
                // Environments
                node: true,
                // Legacy
                nomen: true,
                //onevar: true,
                white: true
            },
            globals: {}
        }
    });
    

    // Load local tasks.
    grunt.loadTasks('tasks');

    // Default task.
    grunt.registerTask('default', 'lint test');

};
