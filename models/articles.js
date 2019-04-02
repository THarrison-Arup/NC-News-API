const knex = require('../db/connection');

exports.fetchArticles = (articles) => {
  return knex('articles')
  .select( '*' );
};

exports.fetchArticleById = (article) => {
  console.log(article);
  return knex('articles')
    .select( '*' );
};