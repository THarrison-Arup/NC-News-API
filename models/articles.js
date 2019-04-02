const knex = require('../db/connection');

exports.fetchArticles = ({ author, topic, sort_by = 'created_at', order = 'desc' }) => {
  return knex('articles')
  .select( '*' )
  .orderBy(sort_by, order)
  .where((query) => {
    if(author) query.where({author});
    if(topic) query.where({topic});
  });
};

exports.fetchArticleById = (article) => {
  return knex('articles')
    .select( '*' );
};

exports.updateArticle = (article) => {

};