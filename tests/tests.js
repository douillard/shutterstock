var app = require("../api/server");
var supertest = require("supertest");

describe("GET /api/v1/tracks", function() {

    var request;
    beforeEach(function() {
        request = supertest(app)
            .get("/api/v1/track")
            .set("Accept", "application/json");
    });

    it("200 response with json", function(done) {
        request
            .expect('Content-Type', /json/)
            .expect(200)
            .end(done);
    });

});

describe("GET /any/other/route", function() {
    var request;
    beforeEach(function() {
        request = supertest(app)
            .get("/any/other/route")
            .set("Accept", "application/json");
    });

    it("404 response with json", function(done) {
        request
            .expect('Content-Type', /json/)
            .expect('Content-Length', '51')
            .expect(404)
            .end(done);
    });

});
