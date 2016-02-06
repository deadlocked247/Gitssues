var tindAngularResponse = readJSON('json/tindAngular.json');

describe("github api service", function () {
	var githubService, httpBackend;

	beforeEach(module("gitssues"));

	beforeEach(inject(function (_githubService_, $httpBackend) {
		githubService = _githubService_;
		httpBackend = $httpBackend;
	}));

	it("githubService should be defined", function () {
        expect(githubService.getRepo("asd", "Asd", 1)).toBeDefined();
    });

	it("should get no github issues for a boring repo", function () {
		httpBackend.expectGET("/gitData/deadlocked247?repo=coldr&page=1&q=").respond([]);
		githubService.getRepo("deadlocked247", "coldr", 1)
		.then(function (payload) {
			expect(payload.data).toEqual([]);
		})
		httpBackend.flush();
	});

	it("should default to page 1 when no page is given", function () {
		httpBackend.expectGET("/gitData/deadlocked247?repo=tindAngular&page=1&q=J").respond(tindAngularResponse);
		githubService.getRepo("deadlocked247", "tindAngular")
		.then(function (payload) {
			expect(payload.data).toEqual(tindAngularResponse);
		})
		httpBackend.flush();
	});

	it("should get return nothing when no url", function () {
		httpBackend.whenGET("gitData/").respond({});
	});

});