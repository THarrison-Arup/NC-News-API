const knex = require("../db/connection");

exports.fetchArticles = ({
  author,
  topic,
  sort_by = "created_at",
  order = "desc"
}) => {
  return knex("articles")
    .select("*")
    .orderBy(sort_by, order)
    .where(query => {
      if (author) query.where({ author });
      if (topic) query.where({ topic });
    });
};

exports.fetchArticleById = ({ article_id }) => {
  return knex("articles")
    .select("*")
    .where(params => {
      if (article_id) params.where({ article_id });
    });
};

exports.updateArticle = ({ article_id }) => {
  return knex("articles")
    .select("*")
    .where(params => {
      console.log({ article_id }, "<-- article id");
      if (article_id) params.where({ article_id });
    });
};
