const knex = require('../db/connection');

exports.fetchArticles = ({ author, topic, sort_by, order }) => {
  return knex('articles')
  .select( '*' )
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