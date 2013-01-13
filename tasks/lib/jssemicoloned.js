'use strict';
var esprima = require('esprima');

exports.init = function (grunt) {
    var exports = {};

    exports.fix = function (src, options, globals, extraMsg) {
        var exports = {}, syntax, semicoloned;

        grunt.log.write('Adding semicolons' + (extraMsg ? ' ' + extraMsg : '') + '  ');
        
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
                        return semicoloned;
                    } else {
                        grunt.log.ok();
                        return null;
                    }
                } else {
                    grunt.log.write('\n');
                    syntax.errors.forEach(function (e) {
                        grunt.log.error(e.message);
                    });
                    return null;
                }
            }
        } catch (e) {
            grunt.log.write('\n');
            grunt.log.error(e.message);
            grunt.fail.errorcount++;
        }
        
    };
    
    
    return exports;
};
