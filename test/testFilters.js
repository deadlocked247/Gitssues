
describe('gitssues filters', function () {

	beforeEach(module('gitssues'));

	it('has a profile filter', inject(function($filter) {
        expect($filter('filterProfiles')).not.toBeNull();
    }));

    it('should not filter if there is no key @', inject(function($filter, $sce) {
    	expect(angular.equals($filter('filterProfiles')('test'), $sce.trustAsHtml('test'))).toBe(true);
    	expect(angular.equals($filter('filterProfiles')('test asd asd asd asd'), $sce.trustAsHtml('test asd asd asd asd"'))).toBe(true);
    	expect(angular.equals($filter('filterProfiles')(''), $sce.trustAsHtml(''))).toBe(true);
    }));

    it('should filter @ and make them href links', inject(function($filter, $sce) {
    	expect(angular.equals($filter('filterProfiles')('@hello'), $sce.trustAsHtml("<a href='https://github.com/hello'>@hello</a> "))).toBe(true);
    	expect(angular.equals($filter('filterProfiles')('before @hello after'), $sce.trustAsHtml("before <a href='https://github.com/hello'>@hello</a> after"))).toBe(true);
    }));

    it('should not stop after first filter', inject(function($filter, $sce) {
    	expect(angular.equals($filter('filterProfiles')('@before test @after'), $sce.trustAsHtml("<a href='https://github.com/before'>@before</a> test <a href='https://github.com/after'>@after</a>"))).toBe(true);
    }));
});