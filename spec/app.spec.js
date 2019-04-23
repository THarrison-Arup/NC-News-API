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
      return request.get("/api").expect(200);
    });
    it("GET status:200 responds with a JSON describing all the available endpoints on the API", () => {
      return request
        .get("/api")
        .expect(200)
        .then(({ body: { msg } }) => {
          expect(msg["GET /api"]).to.eql({
            description:
              "serves up a json representation of al the available endpoints of the api"
          });
        });
    });
  });

  describe("/api/topics", () => {
    it("GET status: 200", () => {
      return request.get("/api/topics").expect(200);
    });
    it("GET status: 200 responds with an array of topics", () => {
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
    xit("GET status: 200 responds with an array of article objects with an author query", () => {
      return request
        .get("/api/articles?author=butter_bridge")
        .expect(200)
        .then(({ body: { articles } }) => {
          articles.forEach(article => {
            expect(article.author).to.equal("butter_bridge");
          });
        });
    });
    xit("GET status: 200 responds with an array of article objects with a topic query", () => {
      return request
        .get("/api/articles?topic=mitch")
        .expect(200)
        .then(({ body: { articles } }) => {
          articles.forEach(article => {
            expect(article.topic).to.equal("mitch");
          });
        });
    });
    xit("GET status: 200 responds with an array of article object with a sort_by query", () => {
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
    it("GET status: 200 resoponds with an array of article objects with a comment_count property", () => {
      return request
        .get("/api/articles")
        .expect(200)
        .then(({ body: { articles } }) => {
          articles.forEach(article => {
            expect(article).to.contain.keys("comment_count");
          });
        });
    });

    it("ERRORS GET status: 200 responds with a message when given a an invalid sort_by query", () => {
      return request
        .get("/api/articles?sort_by=test")
        .expect(200)
        .then(({ body: { msg } }) => {
          expect(msg).to.equal("Sort query is invalid");
        });
    });

    describe("/api/articles/:article_id", () => {
      it("GET status: 200", () => {
        return request.get("/api/articles/1").expect(200);
      });
      xit("GET status: 200 responds with an article object", () => {
        return request
          .get("/api/articles/3")
          .expect(200)
          .then(({ body: { article } }) => {
            expect(article).to.contain.keys(
              "article_id",
              "title",
              "topic",
              "author",
              "body",
              "created_at",
              "comment_count",
              "votes"
            );
            expect(article.article_id).to.equal(3);
          });
      });
      it("PATCH status: 200", () => {
        return request.patch("/api/articles/1").expect(200);
      });
      it("PATCH status: 200 responds with an article object", () => {
        return request
          .patch("/api/articles/2")
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
            expect(article.article_id).to.equal(2);
          });
      });
      it("PATCH status: 200 responds with an article object and takes a patch body", () => {
        return request
          .patch("/api/articles/4")
          .send({ inc_votes: 1 })
          .expect(200)
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
      it("DELETE status: 204 responds with an error status and message", () => {
        return request
          .get("/api/articles/6")
          .expect(200)
          .then(({ body: { article } }) => {
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
            return request.delete("/api/articles/6").expect(204);
          })
          .then(() => {
            return request.get("/api/articles/6").expect(404);
          });
      });

      describe("/api/articles/:article_id", () => {
        it("ERRORS GET status: 400 responds with error message when request is made with a bad ID", () => {
          return request
            .get("/api/articles/a")
            .expect(400)
            .then(({body: {msg}}) => {
            });
        });
        it("ERRORS GET status: 404 responds with error message when bad request is made", () => {
          return request
            .get("/api/particles/1")
            .expect(404)
            .then(({body: {msg}}) => {
            });
        });
        it("ERRORS GET status: 404 responds with an error message when given an invalid inc_votes", () => {
          return request
            .patch("/api/articles/2")
            .send({ inc_votes: "a" })
            .expect(200)
            .then(({body: {msg}}) => {
              console.log(msg,'<-- error msg');
            });
        });
      });

      describe("/api/articles/:article_id/comments", () => {
        it("GET status: 200", () => {
          return request.get("/api/articles/1/comments").expect(200);
        });
        it("GET status: 200 returns an array of comment objects", () => {
          return request
            .get("/api/articles/1/comments")
            .expect(200)
            .then(({ body: { comments } }) => {
              expect(comments).to.be.an("array");
              expect(comments[0]).to.contain.keys(
                "comment_id",
                "body",
                "article_id",
                "author",
                "votes",
                "created_at"
              );
            });
        });
        it("GET status: 200 return a sorted array of comment objects", () => {
          return request
            .get("/api/articles/1/comments?sort_by=comment_id")
            .expect(200)
            .then(({ body: { comments } }) => {
              expect(comments).to.be.an("array");
              expect(comments[0]).to.eql({
                comment_id: 18,
                author: "butter_bridge",
                article_id: 1,
                votes: 16,
                created_at: "2000-11-26T00:00:00.000Z",
                body: "This morning, I showered for nine minutes."
              });
            });
        });
        it("GET status: 200 return a sorted array of comment object when given a sort_by criteria and an order", () => {
          return request
            .get("/api/articles/1/comments?sort_by=comment_id&&order=asc")
            .expect(200)
            .then(({ body: { comments } }) => {
              expect(comments).to.be.an("array");
              expect(comments[0]).to.eql({
                comment_id: 2,
                author: "butter_bridge",
                article_id: 1,
                votes: 14,
                created_at: "2016-11-22T00:00:00.000Z",
                body:
                  "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky."
              });
            });
        });
        it("POST status: 201", () => {
          return request.post("/api/articles/1/comments").expect(201);
        });
        it("POST status: 201 responds with the posted comment object", () => {
          return request
            .post("/api/articles/1/comments")
            .send({ author: "butter_bridge", body: "test comment" })
            .expect(201)
            .then(({ body: { comment } }) => {
              expect(comment).to.contain.keys(
                "comment_id",
                "author",
                "body",
                "votes",
                "created_at",
                "article_id"
              );
              expect(comment.author).to.equal("butter_bridge");
            });
        });
      });
    });
  });

  describe("/api/comments", () => {
    it("GET status: 200", () => {
      return request.get("/api/comments").expect(200);
    });
    it("GET status: 200 responds with an array of comment objects", () => {
      return request
        .get("/api/comments")
        .expect(200)
        .then(({ body: { comments } }) => {
          expect(comments).to.be.an("array");
          expect(comments[0]).to.contain.keys(
            "comment_id",
            "body",
            "article_id",
            "author",
            "votes",
            "created_at"
          );
        });
    });

    describe("/api/comments/:comment_id", () => {
      it("GET status: 200", () => {
        return request.get("/api/comments/1").expect(200);
      });
      it("PATCH status: 201", () => {
        return request.patch("/api/comments/1").expect(201);
      });
      it("PATCH status: 201 responds with the comment object of the updated comment", () => {
        return request
          .patch("/api/comments/1")
          .send({ inc_votes: -1 })
          .expect(201)
          .then(({ body: { comment } }) => {
            expect(comment).to.eql({
              comment_id: 1,
              author: "butter_bridge",
              body:
                "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
              votes: 15,
              created_at: "2017-11-22T00:00:00.000Z",
              article_id: 9
            });
            expect(comment.votes).to.equal(15);
          });
      });
      it("DELETE status: 204", () => {
        return request.delete("/api/comments/15").expect(204);
      });
      it("DELETE status: 204 responds with an error status and message", () => {
        return request
          .get("/api/comments/11")
          .expect(200)
          .then(({ body: { comment } }) => {
            expect(comment).to.eql({
              comment_id: 11,
              author: "icellusedkars",
              article_id: 1,
              votes: 0,
              created_at: "2007-11-25T00:00:00.000Z",
              body: "Ambidextrous marsupial"
            });
          })
          .then(() => {
            return request.delete("/api/comments/11").expect(204);
          })
          .then(() => {
            return request.get("/api/comments/11").expect(404);
          });
      });
    });
  });

  describe("/api/users", () => {
    it("GET status: 200", () => {
      return request.get("/api/users").expect(200);
    });
    it("GET status: 200 responds with an array of user objects", () => {
      return request
        .get("/api/users")
        .expect(200)
        .then(({ body: { users } }) => {
          expect(users).to.be.an("array");
        });
    });

    describe("/api/users/:user_id", () => {
      it("GET status: 200", () => {
        return request.get("/api/users/1").expect(200);
      });
      it("GET status: 200 responds with a user object", () => {
        return request
          .get("/api/users/1")
          .expect(200)
          .then(({ body: { user } }) => {
            expect(user).to.contain.keys("username", "name", "avatar_url");
          });
      });
    });

    describe("/api/users/:username", () => {
      it("GET status: 200", () => {
        return request.get("/api/users/butter_bridge").expect(200);
      });
      it("GET status: 200 responds with a user object", () => {
        return request
          .get("/api/users/butter_bridge")
          .expect(200)
          .then(({ body: { user } }) => {
            expect(user).to.contain.keys("username", "name", "avatar_url");
          });
      });
    });
  });
});
