'use strict';

var appDirectives = angular.module('appDirectives', []);

/**
 * @ngdoc directive
 * @name loader
 * @description 
 * Gives a DOM CSS loading element that is shown and hidden by a boolean
 */
appDirectives.directive("loader", function() {
	return {
		restrict: "E",
		scope: {
			loading: '='
		},
		template : "<div ng-show='loading' class='css_spinner'>" 
		+ "<div class='half left'>" 
		+ "<div class='band'></div>"
		+ "</div>" 
		+ "<div class='half right'>"
		+ "<div class='band'></div>" 
		+ "</div></div>"	
	}
})

/**
 * @ngdoc directive
 * @name ngEnter
 * @description
 * Simple directive to execute function on enter key pressdown
 */
appDirectives.directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if(event.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
});