
exports.up = function(knex, Promise) {
return knex.schema.createTable('topics', topics => {
    topics.text('slug').primary;
    topics.text('descripiton');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('topics');
};
