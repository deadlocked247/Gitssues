'use strict';

/* Written by BA 2016 for Twitter Intership */

var appControllers = angular.module('appControllers', []);

/**
 * @ngdoc controller
 * @name issueController
 * @description
 * Controller to modify data from github api and show a specific issues for a given author and repo
 */
appControllers.controller('issueController', function($scope, $location, githubService, darken) {

	/** Get the comment and issue data from the API
	 * @param {String} auth - author of the repo
	 * @param {String} repo - repo that get the issue of
	 * @param {number} issueId - id of the issue to get
	 */
	$scope.getIssueData = function(auth, repo, issueId) {
		$scope.loading = true;
		githubService.getIssue(auth, repo, issueId)
		.then(function (payload) {
			if(payload.data && payload.data.message) {
				$scope.errorMessage = payload.data.message;
				$scope.loading = false;
			}
			else {
				$scope.issueData = payload.data;
				return githubService.getComments(auth, repo, issueId);
			}	
		})
		.then(function (payload) {
			$scope.loading = false;
			$scope.commentData = payload.data;
		})
		.catch(function (payload) {
			$scope.loading = false;
			$scope.errorMessage = payload.data.message;
		})
	}

	/**
	 * Get the queries in the URL and apply to controller variables
	 */
	$scope.getIssueUrl = function() {
		var query = $location.search();
		if(query) {
			for (var key in query) {
				if (query.hasOwnProperty(key)) {
					switch(key) {
						case 'id':
							$scope.issueId = query[key];
							break;
						case 'repo':
							$scope.repoName = query[key];
							break;
						case 'author':
							$scope.authName = query[key];
							break;
					}
				}
			}
			if($scope.authName && $scope.repoName && $scope.issueId) {
				$scope.errorMessage = undefined;
				$scope.getIssueData($scope.authName, $scope.repoName, $scope.issueId);
			}
			else {
				$scope.errorMessage = "Whoops, couldn't find that issue! Click here to go back."; 
			}
		}
	}

	/** Call the function to parse url **/
	$scope.getIssueUrl();

	/** When a user clicks on a label, link back to the main page showing only the labels **/
	$scope.viewLabel = function(labelName) {
		window.location.href = "/?repo=" + $scope.repoName + "&author=" + $scope.authName + "&labels=" + labelName; 
	}

	/** Go back to the main page, browser back button should also work **/
	$scope.goBack = function() {
		window.location.href = "/?repo=" + $scope.repoName + "&author=" + $scope.authName;
	}

	/**
	 * Gives a contrasting color for a given HEX to create the HEX 
	 * of the text color (for legibility)
	 */
	$scope.darkenColor = function(val) {
		return darken.hex(val, -60);
	}
});
