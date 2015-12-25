
var expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest.agent("http://localhost:8080")


// ********************************************************
// STEP 1:  .
// expected result 302 bad request
// status pass
// ********************************************************
it('STEP 1:  Create a test user', function (done) {
    api.post('/users')
        .send({
            email: 'foobar@example.com',
            name: 'Foo bar',
            username: 'foobar',
            password: 'foobar'
        })
        .end(function(err, res) {
            expect(res.status).to.be.equal(200);
            done();
        });
});

// ********************************************************
// STEP 2: Login with the user  .
// expected result 200 bad request
// status pass
// ********************************************************
it("STEP 2: Login with the test user", function (done) {
    api.post('/users/session')
        .send({
            email: 'foobar@example.com',
            password: 'foobar'
        })
        .end(function(err, res) {
            expect(res.status).to.be.equal(302);
            done();
        });
});

// ********************************************************
// STEP 2.2: Create article
// expected result 200
// status pass
// ********************************************************
it("STEP 2.2: Create an article", function (done) {
    api.post('/articles')
        .send({
            title: 'test article',
            body: 'This is a test Body'
        })
        .end(function (err, res) {
            expect(res.status).to.be.equal(302);
            done();
        });
});

// ********************************************************
// STEP 3: Making a search article request with valid title.
// expected result 200
// status pass
// ********************************************************
it("STEP 3: Making a search article request with valid title", function (done) {
    api.get('/articles?format=json&title=test')
        .set('Accept', 'application/json')
        .end(function (err, res) {
            expect(res.status).to.be.equal(200);
            done();
        });
});

// ********************************************************
// STEP 3.1: Making a search article request with invalid title.
// expected result 200
// status pass
// ********************************************************
it("STEP 3.1: Making a search article request with invalid title", function (done) {
    api.get('/articles?format=json&title=blahblah')
        .set('Accept', 'application/json')
        .end(function (err, res) {
            expect(res.body.articles.length).to.be.equal(0);
            done();
        });
});


// ********************************************************
// STEP 3.2: Making a search article request with valid body.
// expected result 200
// status pass
// ********************************************************
it("STEP 3.2: Making a search article request with valid body", function (done) {
    api.get('/articles?format=json&title=body')
        .set('Accept', 'application/json')
        .end(function (err, res) {
            expect(res.status).to.be.equal(200);
            done();
        });
});

// ********************************************************
// STEP 3.3: Making a search article request with valid body.
// expected result 200
// status pass
// ********************************************************
it("STEP 3.3: Making a search article request with invalid body", function (done) {
    api.get('/articles?format=json&title=very fat body')
        .set('Accept', 'application/json')
        .end(function (err, res) {
            expect(res.body.articles.length).to.be.equal(0);
            done();
        });
});


// ********************************************************
// STEP 4: Searching with default lat and long.
// expected result 200
// status pass
// ********************************************************
it("STEP 4: Searching with default lat and long", function (done) {
    api.get('/articles?format=json&criteria={"lon": "-74.0058999999999969", "lat": "40.7126999999999981", "distance": "500"}')
        .set('Accept', 'application/json')
        .end(function (err, res) {
            expect(res.body.articles.length).to.be.above(0);
            done();
        });
});

// ********************************************************
// STEP 4.1: Searching with non default lat and long.
// expected result 200
// status pass
// ********************************************************
it("STEP 4.1: Searching with non default lat and long", function (done) {
    api.get('/articles?format=json&criteria={"lon": "-74", "lat": "40", "distance": "50"}')
        .set('Accept', 'application/json')
        .end(function (err, res) {
            expect(res.body.articles.length).to.be.equal(0);
            done();
        });
});

// ********************************************************
// STEP 4.2: Searching with lat, long, title and body.
// expected result 200
// status pass
// ********************************************************
it("STEP 4.2: Searching with lat, long, title and body", function (done) {
    api.get('/articles?format=json&criteria={"lon": "-74", "lat": "40", "distance": "50"}&title=test&body=Body')
        .set('Accept', 'application/json')
        .end(function (err, res) {
            expect(res.body.articles.length).to.be.equal(0);
            done();
        });
});


// ********************************************************
// STEP 4.3: Searching with default lat, long, title, body and price range.
// expected result 200
// status pass
// ********************************************************
it("STEP 4.3: Searching with default lat, long, title and body", function (done) {
    api.get('/articles?format=json&criteria={"lon": "-74.0058999999999969", "lat": "40.7126999999999981", "distance": "500"}&title=test&body=Body&minPrice=0&maxPrice=8')
        .set('Accept', 'application/json')
        .end(function (err, res) {
            expect(res.body.articles.length).to.be.above(0);
            done();
        });
});

// ********************************************************
// STEP 4.4: Searching with wrong lat, long, title, body and price range.
// expected result 200
// status pass
// ********************************************************
it("STEP 4.4: Searching with wrong lat, long, title and body", function (done) {
    api.get('/articles?format=json&criteria={"lon": "-74", "lat": "40", "distance": "50"}&title=test&body=body&minPrice=0&maxPrice=8')
        .set('Accept', 'application/json')
        .end(function (err, res) {
            expect(res.body.articles.length).to.be.equal(0);
            done();
        });
});

// ********************************************************
// STEP 4.5: Searching with city, country, title, body and price range.
// expected result 200
// status pass
// ********************************************************
it("STEP 4.5: Searching with lat, long, title and body", function (done) {
    this.timeout(80000);
    api.get('/articles?format=json&city=new york&country=usa&title=test&body=Body&minPrice=0&maxPrice=8')
        .set('Accept', 'application/json')
        .end(function (err, res) {
            expect(res.body.articles.length).to.be.above(0);
            done();
        });
});
