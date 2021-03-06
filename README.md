# grunt-jssemicoloned

This is a [Grunt](http://gruntjs.com) task to validate JavaScript source.
It uses [Acorn](http://marijnhaverbeke.nl/acorn/) to look for possible syntax
errors and automatically inserts missing semicolons.

## How to Use It

First, install the [package](https://npmjs.org/package/grunt-jssemicoloned):

    npm install grunt-jssemicoloned

Modify your `Gruntfile.js` file to have the following line somewhere:

```javascript
grunt.loadNpmTasks('grunt-jssemicoloned');
```

If it has been installed correctly, running `grunt --help` should
include `jssemicoloned` in the list of available tasks.

Set the files to be validated, as part of Grunt configuration via the
new `jssemicoloned` key. As an example, `initConfig` in your `grunt.js`
might look like the following fragment:

```javascript
grunt.initConfig({
  pkg: '<json:package.json>',
  jssemicoloned: {
    files: ['*.js', 'lib/**/*.js', 'test/**/*.js']
  },
  test: {
    files: ['test/**/*.js']
  }
}
```

You can specify the files to be validated using the usual file pattern.
In the above examples, it will validate every `*.js` files in the main
directory, the `lib` directory, and the `test` directory. It will also alter
all files with missing semicolons.

Whenever you want the semicolon insertion task to run, just invoke it using:

    grunt jssemicoloned

It is not recommended to include the validation task in your default.
