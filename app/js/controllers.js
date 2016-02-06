'use strict';

/* Written by BA 2016 for Twitter Intership */

var appControllers = angular.module('appControllers', []);

/**
 * @ngdoc controller
 * @name feedController
 * @description
 * Controller to modify data from github api and show all issues for a given repo
 */
appControllers.controller("feedController", function($scope, githubService, darken, $location) {


	/* Default Github repo as given by prompt */
	$scope.gitHubUrl = "https://github.com/rails/rails";

	$scope.closedIssues = true;
	$scope.openIssues = true;

	/* Starting page */
	$scope.page = 1;
	/** 
	 * Reset scope values for API calls
	 */
	$scope.reset = function() {
		$scope.page = 1;
		$scope.query = "";
		$scope.noData = false;
		$scope.onlyOnePage = false;
		$scope.errorMessage = undefined;
	}

	/** Gets the string that we can use for the UI with the given 140 character limit
	 * @param {String} string - string to limit to 140 characters
	 * @return {String} The limited string with no words cut
	 */
	$scope.getCharacterLimit = function(string) {
		var ending = "";
		if(string && string.length >= 140) {
			//re-trim if we are in the middle of a word
			var trim = string.substr(0, 140).substr(0, Math.min(string.substr(0, 140).length, string.substr(0, 140).lastIndexOf(" ")));
			if(trim.length == 0) {
				return string;
			}
			else {
				return trim + "...";
			}
		}
		else {
			return string;
		}
	}

	/* Get the repo auth data 
	 * @param {String} auth - author/owner of the repo
	 * @param {String} repo - repo name
	 * @param {String} query - additional query in the correct URI format
	 */
	$scope.getRepoAuthData = function(auth, repo, query) {
		$scope.noData = false;
		$scope.onlyOnePage = false;
		$scope.loading = true;
		$scope.errorMessage = undefined;
		
		/* Call the github service to get repo */
		githubService.getRepo(auth, repo, query)
		.then(function (payload) {
			/* Make sure the payload we recieve is an array and is not an error message */
			if(!(payload.data instanceof Array) && payload.data.message) {
				$scope.errorMessage = payload.data.message;
				$scope.page = 1;
				$scope.arrayOne = undefined;
				$scope.arrayTwo = undefined;
				$scope.arrayThree = undefined;
				$scope.clickedLabel = undefined;
			}
			else {
				var length = payload.data.length;
				/* Check if we only have one page left, so remove the ability to let users go back and forth */
				if(length == 0 && $scope.page == 2) {
					$scope.onlyOnePage = true;
					$scope.page = 1;
					$location.search('page', 1);
				}
				else if(length == 0) {
					$scope.noData = true;
				}
				else {
					console.log(payload.data);
					for(var i = 0; i < length; i++) {
						payload.data[i].body = $scope.getCharacterLimit(payload.data[i].body);
					};
					/* Divide data up into three arrays for columns in view */
					$scope.arrayOne = payload.data.slice(0,Math.floor(length/3));
					$scope.arrayTwo = payload.data.slice(Math.floor(length/3),Math.floor(length*2/3));;
					$scope.arrayThree = payload.data.slice(Math.floor(length*2/3),length);

					if(length < 25 ) {
						$scope.onlyOnePage = true;
					};

				}
			}
			$scope.loading = false;
			
		})
		.catch(function (payload) {
			$scope.loading = false;
			$scope.errorMessage = payload.data || "Unknown Error";
		});
	}

	/**
	 * Construct the URL query from the scopes on the DOM
	 */
	$scope.constructQuery = function() {
		var query = "?page=" + $scope.page;
		$location.search('page', $scope.page);
		if($scope.clickedLabel) {
			query = query + "&labels=" + $scope.clickedLabel;
			$location.search('labels', $scope.clickedLabel);
		}

		query = query + "&state=";

		if(($scope.openIssues && $scope.closedIssues) || (!$scope.openIssues && !$scope.closedIssues)) {
			query = query + "all";
			$location.search('state', 'all');
		}
		else if($scope.closedIssues) {
			query = query + "closed";
			$location.search('state', 'closed');
		}
		else {
			query = query + "open";
			$location.search('state', 'open');
		}

		return query;
	}

	/* Load query elements from URL to scope elements */
	$scope.checkQuery = function() {
		var query = $location.search();
		if(query) {
			for (var key in query) {
				if (query.hasOwnProperty(key)) {
					switch(key) {
						case 'page': 
							$scope.page = query[key];
							break;
						case 'labels':
							$scope.clickedLabel = query[key];
							break;
						case 'repo':
							$scope.repoName = query[key];
							break;
						case 'author':
							$scope.authName = query[key];
							break;
						case 'state':
							if(query[key] == 'open') {
								$scope.openIssues = true;
								$scope.closedIssues = false;
							}
							else if(query[key] == 'closed') {
								$scope.closedIssues = true;
								$scope.openIssues = false;
							}
							else {
								$scope.closedIssues = true;
								$scope.openIssues = true;
							}
					}
				}
			}
			/* if we have something to make a call with, make the service call */
			if($scope.authName && $scope.repoName) {
				$scope.gitHubUrl = "https://github.com/" + $scope.authName + '/' + $scope.repoName;
				$scope.getRepoAuthData($scope.authName, $scope.repoName, $scope.constructQuery());
			}
		}
	}

	$scope.checkQuery();

	/**
	 * Parse a given url to check for validity 
	 * Validity means the given value either starts with 'https://github.com/author/repo' or 
	 * 'https://www.github.com/author/repo' 
	 * @param {String} url - the value to parse the url of 
	 * @return {boolean, Array} - Returns the array of parsed values ['github.com', 'author', 'repo']
	 * else it returns false
	 */
	$scope.parseUrl = function(url) {
		var findWord = url.search("github.com/");
		if(findWord == -1) {
			return false;
		}
		else {
			var subStr = url.substring(findWord,url.length);
			var arr = subStr.split("/");
			if(arr[1].length > 0 ) {
				return arr;
			}
			else {
				return false;
			}
			
		}
	}

	/**
	 * Gives a contrasting color for a given HEX to create the HEX 
	 * of the text color (for legibility)
	 */
	$scope.darkenColor = function(val) {
		return darken.hex(val, -60);
	}

	/**
	 * Updates the data on the given repo and author with a new page number (from view)
	 */
	$scope.updateData = function(page) {
		$scope.page = page;
		$scope.loadData();
	}

	/**
	 * Checks the validity of the url input field from DOM
	 * Check if the string is a valid URL format per Angular's URL formatting regulations
	 */
	$scope.checkFields = function() {
		if($scope.form.input.$valid) {
			var parsedData = $scope.parseUrl($scope.gitHubUrl);
			if(parsedData) {
				$scope.authName = parsedData[1];
				if(parsedData[2]) {
					$scope.repoName = parsedData[2];
				}
				else {
					$scope.repoName = "";
				}
				
				return true;
			}
		}
		else {
			$scope.errorMessage = "That URL is not valid (start with https://)";
			return false;
		}
	}

	/* Set the open/close label and match with the query */
	$scope.setLabel = function(label) {
		$scope.clickedLabel = label;
		$location.search('labels', label);
		$scope.loadData();
	}

	/**
	 * Loads the data from the promise provided by service
	 */
	$scope.loadData = function() {

		if(!$scope.openIssues && !$scope.closedIssues) {
			$scope.openIssues = true;
			$scope.closedIssues = true;
		}

		/* Make sure we have valid data */
		var parsedData = $scope.checkFields();
		if(parsedData) {
			$location.search('author', $scope.authName);
			$location.search('repo', $scope.repoName);			
			$scope.getRepoAuthData($scope.authName, $scope.repoName, $scope.constructQuery());
			
		}	
	}

	/* Go to the card for next view, using standard javascript window because Angular is annoying */
	$scope.goTo = function(card) {
		window.location.href= ('/issue/?repo=' + $scope.repoName + '&author=' + $scope.authName + '&id=' + card.number);
	}


});
