var tindAngularResponse = readJSON('json/tindAngular.json');
var railsIssueResponse = readJSON('json/railsIssue.json');
var railsCommentResponse = readJSON('json/railsComment.json');

describe("github api service", function () {
	var githubService, httpBackend;

	beforeEach(module("gitssues"));

	beforeEach(inject(function (_githubService_, $httpBackend) {
		githubService = _githubService_;
		httpBackend = $httpBackend;
	}));

	it("githubService get Reposhould be defined", function () {
        expect(githubService.getRepo("asd", "Asd", "")).toBeDefined();
    });

    it("githubService get Issue should be defined", function () {
        expect(githubService.getIssue("fake", "stuff", 1)).toBeDefined();
    });

    it("githubService get comments should be defined", function () {
        expect(githubService.getComments("fake", "stuff", 1)).toBeDefined();
    });

    it("should find this real repo and should match issue comment mock data", function () {
		httpBackend.expectGET("/issueComments/rails/rails/23523").respond(railsCommentResponse);
		githubService.getComments("rails", "rails", 23523)
		.then(function (payload) {
			expect(payload.data).toEqual(railsCommentResponse);
		})
		httpBackend.flush();
	});

	it("should find this real repo and should match issue mock data", function () {
		httpBackend.expectGET("/issueData/rails/rails/23523").respond(railsIssueResponse);
		githubService.getIssue("rails", "rails", 23523)
		.then(function (payload) {
			expect(payload.data).toEqual(railsIssueResponse);
		})
		httpBackend.flush();
	});

    it("should find this real repo and should match mock data", function () {
		httpBackend.expectGET("/gitData/deadlocked247/tindAngular").respond(tindAngularResponse);
		githubService.getRepo("deadlocked247", "tindAngular", "")
		.then(function (payload) {
			expect(payload.data).toEqual(tindAngularResponse);
		})
		httpBackend.flush();
	});


	it("should not find fake repo", function () {
		httpBackend.expectGET("/gitData/deadlocked247/notReal").respond({"message":"Not Found","documentation_url":"https://developer.github.com/v3"});
		githubService.getRepo("deadlocked247", "notReal", "")
		.then(function (payload) {
			expect(payload.data).toEqual({"message":"Not Found","documentation_url":"https://developer.github.com/v3"});
		})
		httpBackend.flush();
	});

	it("should not find fake author", function () {
		httpBackend.expectGET("/gitData/ireallyhopethisisntaperson/notReal").respond({"message":"Not Found","documentation_url":"https://developer.github.com/v3"});
		githubService.getRepo("ireallyhopethisisntaperson", "notReal", "")
		.then(function (payload) {
			expect(payload.data).toEqual({"message":"Not Found","documentation_url":"https://developer.github.com/v3"});
		})
		httpBackend.flush();
	});

	it("should get return nothing when no url", function () {
		httpBackend.whenGET("gitData/").respond({});
	});

});