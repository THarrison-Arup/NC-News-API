const knex = require('../db/connection');

exports.fetchTopics = ({topics}) => {
  return knex('topics')
    .select('*');
};