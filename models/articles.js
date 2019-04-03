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
    })
    .returning("*");
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
  { sort_by = "created_at", order }
) => {
  return knex("comments")
    .select("*")
    .orderBy(sort_by)
    .where(article => {
      console.log(article_id,'<--article_id')
      if (article_id) article.where({ article_id });
    })
    .returning("*");
};
