
exports.up = function(knex, Promise) {
  return knex.schema.createTable('articles', articles => {
    articles.increments('article_id').primary();
    articles.text('title');
    articles.text('body');
    articles.integer('votes').defaultTo(0);
    articles.text('topic');
    articles.text('author').references('users.username').onDelete('CASCADE');
    articles.date('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('articles');
};
