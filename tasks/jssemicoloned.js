module.exports = function (grunt) {
    'use strict';

    grunt.registerMultiTask('jssemicoloned', 'Insert semicolons into JavaScript source.', function () {
        var options = {}, globals = {};

        // FIXME: get options and globals from the project's grunt file.

        grunt.file.expandFiles(this.file.src).forEach(function (filepath) {
            grunt.verbose.write('jssemicoloned ' + filepath);
            grunt.helper('jssemicoloned', grunt.file.read(filepath), options, globals, filepath);
        });

        if (this.errorCount === 0) {
            grunt.log.writeln('Done.');
        }

        return (this.errorCount === 0);
    });

    grunt.registerHelper('jssemicoloned', function (src, options, globals, filepath) {
        var esprima, syntax, semicoloned;

        grunt.log.write('Adding semicolons' + (filepath ? ' ' + filepath : '') + '  ');

        esprima = require('esprima');
        try {
            // Skip shebang.
            if (src[0] === '#' && src[1] === '!') {
                grunt.log.ok('Skipped');
            } else {
                syntax = esprima.parse(src, { tolerant: true });
                if (syntax.errors.length === 0) {
                    semicoloned = syntax.semicoloned;
                    if (semicoloned !== src) {
                        grunt.log.ok('Fixed');
                        grunt.file.write(filepath, semicoloned);
                    } else {
                        grunt.log.ok();
                    }
                } else {
                    grunt.log.write('\n');
                    syntax.errors.forEach(function (e) {
                        grunt.log.error(e.message);
                    });
                    return;
                }
            }
        } catch (e) {
            grunt.log.write('\n');
            grunt.log.error(e.message);
            grunt.fail.errorcount++;
        }
    });

};
