const knex = require('../db/connection');

exports.fetchComments = () => {
  return knex("comments")
    .select("*")
    .returning("*");
};
