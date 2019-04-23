const knex = require("../db/connection");

exports.fetchArticles = ({
  author,
  topic,
  sort_by = "comments.created_at",
  order = "desc"
}) => {
  return (
    knex("comments")
      .select("comments.article_id", "articles.article_id")
      .count('articles.title AS comment_count')
      .innerJoin("articles", "articles.article_id", "=", "comments.article_id")
      .groupBy("articles.article_id", "comments.article_id","comments.created_at")
      .orderBy(sort_by, order)
      .where(query => {
        if (author) query.where({ author });
        if (topic) query.where({ topic });
      })
      
  );
};

exports.fetchArticleById = ({ article_id }) => {
  return knex("articles")
    .select("*")
    .where(params => {
      if (article_id) params.where({ article_id });
    });
};

exports.updateArticle = ({ article_id }, { inc_votes = 0 }) => {
  return knex("articles")
    .select("*")
    .where(article => {
      if (article_id) article.where({ article_id });
    })
    .then(([article]) => {
      return knex("articles")
        .where({ article_id })
        .update("votes", article.votes + inc_votes)
        .returning("*");
    });
};

exports.removeArticle = ({ article_id }) => {
  return knex("articles")
    .select("*")
    .where(article => {
      if (article_id) article.where({ article_id });
    })
    .then(([article]) => {
      return knex("articles")
        .where(article)
        .del();
    });
};

exports.fetchCommentsByArticleId = (
  { article_id },
  { sort_by = "created_at", order = "desc" }
) => {
  return knex("comments")
    .select("*")
    .orderBy(sort_by, order)
    .where(article => {
      if (article_id) article.where({ article_id });
    })
    .returning("*");
};

exports.addComment = ({ article_id }, { author, body }) => {
  return knex("comments")
    .insert({ article_id, author, body })
    .returning("*");
};
