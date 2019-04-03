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
    it("GET status: 200 responds with an array of article objects with an author query", () => {
      return request
        .get("/api/articles?author=butter_bridge")
        .expect(200)
        .then(({ body: { articles } }) => {
          articles.forEach(article => {
            expect(article.author).to.equal("butter_bridge");
          });
        });
    });
    it("GET status: 200 responds with an array of article objects with a topic query", () => {
      return request
        .get("/api/articles?topic=mitch")
        .expect(200)
        .then(({ body: { articles } }) => {
          articles.forEach(article => {
            expect(article.topic).to.equal("mitch");
          });
        });
    });
    it("GET status: 200 responds with an array of article object with a sort_by query", () => {
      return request
        .get("/api/articles?sort_by=title")
        .expect(200)
        .then(({ body: { articles } }) => {
          expect(articles[0]["article_id"]).to.equal(7);
        });
    });
    it("GET status: 200 responds with an array of article objects with a sort order", () => {
      return request
        .get("/api/articles?sort_by=title&&order=asc")
        .expect(200)
        .then(({ body: { articles } }) => {
          expect(articles[0]["article_id"]).to.equal(6);
        });
    });

    describe("/api/articles/:article_id", () => {
      it("GET status: 200", () => {
        return request.get("/api/articles/1").expect(200);
      });
      it("GET status: 200 responds with an article object", () => {
        return request
          .get("/api/articles/3")
          .expect(200)
          .then(({ body: { article } }) => {
            expect(article).to.contain.keys(
              "title",
              "topic",
              "author",
              "body",
              "created_at",
              "votes"
            );
            expect(article.article_id).to.equal(3);
          });
      });
      it("PATCH status: 201", () => {
        return request.patch("/api/articles/1").expect(201);
      });
      it("PATCH status: 201 responds with an article object", () => {
        return request
          .patch("/api/articles/2")
          .expect(201)
          .then(({ body: { article } }) => {
            expect(article).to.contain.keys(
              "title",
              "topic",
              "author",
              "body",
              "created_at",
              "votes"
            );
            expect(article.article_id).to.equal(2);
          });
      });
      it("PATCH status: 201 responds with an article object and takes a patch body", () => {
        return request
          .patch("/api/articles/4")
          .send({ inc_votes: 1 })
          .expect(201)
          .then(({ body: { article } }) => {
            expect(article.article_id).to.equal(4);
            expect(article).to.eql({
              article_id: 4,
              author: "rogersop",
              body:
                "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
              created_at: "2006-11-18T00:00:00.000Z",
              title: "Student SUES Mitch!",
              topic: "mitch",
              votes: 1
            });
          });
      });
      it("DELETE status: 204", () => {
        return request.delete("/api/articles/6").expect(204);
      });
      it("DELETE status: 204 responds with an array of article objects with an article object removed", () => {
        return request
          .get("/api/articles/6")
          .expect(200)
          .then(({ body: { article } }) => {
            console.log(article, "<--article6");
            expect(article).to.eql({
              article_id: 6,
              title: "A",
              body: "Delicious tin of cat food",
              votes: 0,
              topic: "mitch",
              author: "icellusedkars",
              created_at: "1998-11-20T00:00:00.000Z"
            });
          })
          .then(() => {
            return request
              .delete("/api/articles/6")
              .expect(204)
              .then(() => {
                return request.get("/api/articles/6").expect(404);
              });
          });
      });
    });
  });
});
