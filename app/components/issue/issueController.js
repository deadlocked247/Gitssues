'use strict';

var appControllers = angular.module('appControllers', []);

appControllers.controller('issueController', function($scope, $location, githubService, darken) {

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
				$scope.gitHubUrl = "https://github.com/" + $scope.authName + '/' + $scope.repoName;
				$scope.getIssueData($scope.authName, $scope.repoName, $scope.issueId);
			}
			else {
				$scope.errorMessage = "Whoops, couldn't find that issue! Click here to go back."; 
			}
		}
	}

	$scope.getIssueUrl();

	$scope.viewLabel = function(labelName) {
		window.location.href = "/?repo=" + $scope.repoName + "&author=" + $scope.authName + "&labels=" + labelName; 
	}

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
