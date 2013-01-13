'use strict';

var grunt = require('grunt');
var jssemicoloned = require('../tasks/lib/jssemicoloned').init(grunt);

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.jssemicoloned = {
    setUp: function (done) {
        // setup here
        done();
    },
    'jssemicoloned': function (test) {
        var input, expected, actual;
        test.expect(5);

        input = 'void(0);';
        expected = null;
        actual = jssemicoloned.fix(input);
        test.equal(actual, expected, 'correct code shouldn\'t change');

        input = 'void(0)\n';
        expected = 'void(0);\n';
        actual = jssemicoloned.fix(input);
        test.equal(actual, expected, 'semicolon expected before a newline');

        input = 'if (true) { a = false || {} }\n';
        expected = 'if (true) { a = false || {}; }\n';
        actual = jssemicoloned.fix(input);
        test.equal(actual, expected, 'semicolon expected at end of block');

        input = 'function add (a, b) {\nreturn\na + b}';
        expected = 'function add (a, b) {\nreturn;\na + b;}';
        actual = jssemicoloned.fix(input);
        test.notEqual(actual, null, 'semicolon expected at end of line even after return, so should return non-null');
        test.equal(actual, expected, 'semicolon expected at end of line even after return');

        //doesn't work yet
        /*
        input = 'void(0)';
        expected = 'void(0);';
        actual = jssemicoloned.fix(input, 'semicolon expected before EOF');
        test.equal(actual, expected);
        */

        test.done();
    }
};