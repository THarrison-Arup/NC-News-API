const knex = require('../db/connection');

exports.fetchArticles = ({articles}) => {
  return knex('articles')
    .select( '*' );
};