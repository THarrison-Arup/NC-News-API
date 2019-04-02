const { articleData, commentData, topicData, userData } = require("../data");
const { timestampToDate, commentsData } = require("../../utils/utils");

exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex("topics")
        .insert(topicData)
        .returning("*");
    })
    .then(topicRows => {
      const userInsertions = knex("users")
        .insert(userData)
        .returning("*");
      return Promise.all([topicRows, userInsertions]);
    })
    .then(([topicRows, userRows]) => {
      const articleInsertions = knex("articles")
      .insert(timestampToDate(articleData))
      .returning("*");
      return Promise.all([topicRows, userRows, articleInsertions]);
    })
    .then(([topicRows, userRows, articleRows]) => {
      const commentInsertions = knex("comments")
        .insert(timestampToDate(commentsData(commentData, articleRows)))
        .returning("*");
      return Promise.all([topicRows, userRows, articleRows, commentInsertions]);
    });
};
