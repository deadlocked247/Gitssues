/* Written by BA 2016 for Twitter Intership */


// Karma configuration
// Generated on Fri Feb 05 2016 21:16:44 GMT-0500 (EST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/angular/angular.min.js',
        'bower_components/angular-mocks/angular-mocks.js',
        'bower_components/angular-loading-bar/src/loading-bar.js',
        'bower_components/angular-route/angular-route.min.js',
        'bower_components/karma-read-json/karma-read-json.js',
        'app/js/services.js',
        'app/js/directives.js',
        'app/js/controllers.js',
        'app/js/filters.js',
        'app/js/app.js',
        'test/*.js',
        {
            pattern: 'json/*.json', included: false
        },
    ],


    // list of files to exclude
    exclude: [
    ],

    plugins : [
    'karma-jasmine',
    'karma-phantomjs-launcher'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
