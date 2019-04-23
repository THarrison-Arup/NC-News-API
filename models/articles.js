const knex = require("../db/connection");

exports.fetchArticles = ({
  author,
  topic,
  sort_by = "articles.created_at",
  order = "desc"
}) => {
  const validSortQueries = ['author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count'];
  if(!validSortQueries.includes(sort_by)) sort_by = 'created_at';
  return (
    knex
      .select("articles.article_id", "articles.title", "articles.votes", "articles.topic", "articles.author", "articles.created_at")
      .from("articles")
      .count({ comment_count: 'comments.comment_id'})
      .leftJoin("comments", "articles.article_id", "comments.article_id")
      .groupBy("articles.article_id")
      .orderBy(sort_by, order)
      .where(query => {
        if (author) query.where({ 'articles.author': author });
        if (topic) query.where({ 'articles.topic': topic });
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
