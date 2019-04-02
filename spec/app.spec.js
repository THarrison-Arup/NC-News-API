process.env.NODE_ENV = "test";

const { expect } = require("chai");
const supertest = require("supertest");

const app = require("../app");
const connection = require("../db/connection");

const request = supertest(app);

describe.only("/", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  describe("/api", () => {
    it("GET status:200", () => {
      return request
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          expect(body.ok).to.equal(true);
        });
    });
  });

  describe("/api/topics", () => {
    it("GET status:200", () => {
      return request.get("/api/topics").expect(200);
    });
    it("GET status:200 responds with an array of topics", () => {
      return request
        .get("/api/topics")
        .expect(200)
        .then(({ body: { topics } }) => {
          expect(topics).to.be.an("array");
        });
    });
  });

  describe("/api/articles", () => {
    it("GET status: 200", () => {
      return request.get("/api/articles").expect(200);
    });
    it("GET status: 200 responds with an array of articles", () => {
      return request
        .get("/api/articles")
        .expect(200)
        .then(({ body: { articles } }) => {
          expect(articles).to.be.an("array");
        });
    });
    
    describe('/api/articles/:article_id', () => {
      it('GET status: 200', () => {
        return request.get('/api/articles/1').expect(200);
      });
      it('GET status: 200 responds with an article object', () => {
        return request
          .get('/api/articles/1')
          .expect(200)
          .then(({body: {article} }) => {
            expect(article).to.contain.keys('title', 'topic', 'author', 'body', 'created_at', 'votes')
          })
      })
    });
  });
});
