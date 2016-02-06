
describe('feedController', function () {

	beforeEach(module('gitssues'));

 	var $controller;

	beforeEach(inject(function($rootScope, $controller){
		scope = $rootScope.$new();
        controller = $controller('feedController', {
            $scope: scope
        });
	}));

	describe('darkenColor', function() {
		it('should darken to the most contrasting color', function() {
			expect(scope.darkenColor("000000")).toBe("999999");
			expect(scope.darkenColor("193B4E")).toBe("b2d4e7");
			expect(scope.darkenColor("0002300")).toBe("99bc99");
			expect(scope.darkenColor("123890")).toBe("abd1ff");
		})
	})
	
	describe('startPage', function () {
		it('start page should be 1', function () {
			expect(scope.page).toBe(1);
		}); 
	});

	describe('reset', function() {
		it('should reset all scope variables', function() {
			scope.page = 3;
			scope.query = "hello";
			scope.noData = "test";
			scope.onlyOnePage = "nope";
			scope.errorMessage = "Fix it";
			scope.reset();
			expect(scope.page).toBe(1);
			expect(scope.query).toBe("");
			expect(scope.noData).toBe(false);
			expect(scope.onlyOnePage).toBe(false);
			expect(scope.errorMessage).toBe(undefined);
		});
	})

	describe('getCharacterLimit', function() {
		it('should return the same string if under 140 characters', function() {
			expect(scope.getCharacterLimit("asd")).toBe("asd");
			expect(scope.getCharacterLimit("asd asd asd asd asd asd asd asd asdsa dasd ")).toBe("asd asd asd asd asd asd asd asd asdsa dasd ");
			expect(scope.getCharacterLimit("")).toBe("");
			expect(scope.getCharacterLimit(123)).toBe(123);
		});
		it('should return original string if the parsed string is length 0', function() {
			expect(scope.getCharacterLimit("asdsadsadasdasdasdasdasdadsadasdasdasdasdsadasdsadsadsadsadsadsadasdsadsadsa")).toBe("asdsadsadasdasdasdasdasdadsadasdasdasdasdsadasdsadsadsadsadsadsadasdsadsadsa");
		});
		it('should return the parsed string perserving words under 140 characters', function() {
			expect(scope.getCharacterLimit("This is a really long string so we can test the limit of the 140 character function limiter we just made it is really long so we will have to parse it because that is important to us "))
			.toBe("This is a really long string so we can test the limit of the 140 character function limiter we just made it is really long so we will have...");
			expect("This is a really long string so we can test the limit of the 140 character function limiter we just made it is really long so we will have...".length).toEqual(141);
			expect(scope.getCharacterLimit("asd dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd"))
			.toBe("asd...");
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

	describe('gitHubUrl', function() {
		it('should start as the default repo given to us', function() {
			expect(scope.gitHubUrl).toBe("https://github.com/rails/rails");
		});
	})

});