'use strict';

/* gitssues app module */
/* Written by BA 2016 for Twitter Intership */

var app = angular.module('gitssues', ['ngRoute', 'appDirectives', 'appServices', 'appControllers', 'angular-loading-bar']);

/**
 * @ngdoc configuration
 * @name appConfig
 * @description
 * Configures our additional modules
 */
app.config(function(cfpLoadingBarProvider, $locationProvider) {
 	cfpLoadingBarProvider.includeSpinner = false;
 	$locationProvider.html5Mode(true)
});

