'use strict';

/* Written by BA 2016 for Twitter Intership */

var appFilters = angular.module('appFilters', []);

/**
 * @ngdoc filter
 * @name filterProfiles
 * @description 
 * Filters out @*** and then inserts an anchor tag to link to actual github profile
 * @param {String} text - the text to filter
 * @return returns the html safe text
 * WARNING - This could give unwanted results by passing as safe HTML
 */
appFilters.filter('filterProfiles', function($sce) {
	return function(text) {
		var str = "";
		for(var x in text) {
			if(text[x] == '@' ) {
				var index1 = x;
			}
			else if(index1 && ((text[x] == ' ') || ((+x + 1) == text.length))) {
				str = str + "<a href='https://github.com/" + text.substring(index1, x).substring(1, text.substring(index1, x).length) + "'>" + text.substring(index1, x) +"</a> ";
				var index1 = undefined;
			}
			else if(!index1){
				str = str + text[x];
			}
		}
		return $sce.trustAsHtml(str); /** .match(/@\S+/) */
	}
})
