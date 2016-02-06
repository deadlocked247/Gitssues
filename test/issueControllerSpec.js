
describe('issueController', function () {

	beforeEach(module('gitssues'));

 	var $controller;

	beforeEach(inject(function($rootScope, $controller){
		scope = $rootScope.$new();
        controller = $controller('issueController', {
            $scope: scope
        });
	}));

	/* All functions in issue controller are services, no scope manipulations */

});
