
describe('feedController', function () {

	beforeEach(module('gitssues'));

 	var $controller;

	beforeEach(inject(function($rootScope, $controller){
		scope = $rootScope.$new();
        controller = $controller('feedController', {
            $scope: scope
        });
	}));

	describe('startPage', function () {
		it('start page should be 1', function () {

			expect(scope.page).toBe(1);
		}); 
	});

	describe('parseURL', function () {
		it('return false if invalid url', function () {
			expect(scope.parseUrl("")).toBe(false);
			expect(scope.parseUrl("THIS IS WRONG")).toBe(false);
			expect(scope.parseUrl("grubhub.com/asdasdsad")).toBe(false);
			expect(scope.parseUrl("github.com/")).toBe(false);
		});
		it('parse the repo and author from valid urls and return as array', function () {
			expect(scope.parseUrl("github.com/test/one")).toEqual(['github.com', 'test', 'one']);
			expect(scope.parseUrl("github.com/rails/rails")).toEqual(['github.com', 'rails', 'rails']);
			expect(scope.parseUrl("github.com/deadlocked247/tindAngular")).toEqual(['github.com', 'deadlocked247', 'tindAngular']);
		});
	});

	describe('tweetData', function() {
		it('should start with the default tweet', function() {
			expect(scope.tweetText).toBe("Gitssues%20is%20amazing!%20You%20should%20hire%20this%20guy!");
		});
	});

	describe('gitHubUrl', function() {
		it('should start as the default repo given to us', function() {
			expect(scope.gitHubUrl).toBe("https://github.com/rails/rails");
		});
	})

});