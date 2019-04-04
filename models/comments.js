const knex = require("../db/connection");

exports.fetchComments = () => {
  return knex("comments")
    .select("*")
    .returning("*");
};

exports.updateComment = ({ comment_id }, { inc_votes = 0}) => {
  return knex("comments")
    .select("*")
    .where(comment => {
      if (comment_id) comment.where({ comment_id });
    })
    .then(([comment]) => {
      return knex("comments")
        .where({ comment_id })
        .update("votes", comment.votes + inc_votes)
        .returning("*");
    });
};
