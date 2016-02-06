'use strict';

/* Written by BA 2016 for Twitter Intership */

var appServices = angular.module('appServices', []);

/**
 * @ngdoc service
 * @name githubService
 * @description
 * Service to talk with GitHub API
 */
appServices.factory("githubService", function($http) {
	return {
		/**
		 * @name getRepo 
		 * @param {String} repo - the name of the github repo
		 * @param {String} author - the name of the github author
		 * @param {number} page - the page number for the call
		 * @param {query} query - additional queries to add to call
		 * @return {promise} The promise object
		 */
		getRepo : function(author, repo, query) {
			/**
			 * Make sure to have query defiend as a string for testing
			 */
			if(!query) {
				query = "";
			}
			
			return $http({
				method: "GET",
				url: "/gitData/" + author + "/" + repo + query
			});
		},

		/**
		 * @name getIssue
		 * @param {String} repo - the name of the github repo
		 * @param {String} author - the name of the github author
		 * @param {number} issue - the issue id to get 
		 * @return {promise} The promise object
		 */
		getIssue : function(author, repo, issue) {
			return $http({
				method: "GET",
				url: "/issueData/" + author + "/" + repo + "/" + issue
			});
		},

		/**
		 * @name getComments
		 * @param {String} repo - the name of the github repo
		 * @param {String} author - the name of the github author
		 * @param {number} issue - the issue id to get 
		 * @return {promise} The promise object
		 */
		getComments : function(author, repo, issue) {
			return $http({
				method: "GET",
				url: "/issueComments/" + author + "/" + repo + "/" + issue
			});
		}
	};
});

/**
 * @ngdoc service
 * @name darken
 * @description
 * Useful for darkening or lightening a hex value by a certain percent (for github labels)
 */
appServices.factory("darken", function() {
	return {

		/**
		 * @name hex
		 * @param {String} color - the string value of the hex, not including hash
		 * @param {number} percent - number that reprents the ratio we mupltiply the hex by (-100 to 100)
		 * @return {promise} The promise object
		 */
		hex : function(color, percent) {  
		    var num = parseInt(color,16),
		    amt = Math.round(2.55 * percent),
		    R = (num >> 16) + amt,
		    G = (num >> 8 & 0x00FF) + amt,
		    B = (num & 0x0000FF) + amt;
		    var ret = (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
			var rgb = parseInt(ret, 16);   // convert rrggbb to decimal
			var r = (rgb >> 16) & 0xff;  // extract red
			var g = (rgb >>  8) & 0xff;  // extract green
			var b = (rgb >>  0) & 0xff;  // extract blue
			var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; 
			/**
			 * Luminosity threshold to check contrast
			 */
			if (luma < 30) {
				/** Run it again but reverse **/
			    return this.hex(color, percent*-1);
			}
			else {
				return ret;
			}
		}
	}
})