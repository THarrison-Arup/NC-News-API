const knex = require("../db/connection");

exports.fetchUsers = () => {
  return knex("users")
    .select("*")
    .returning("*");
};

exports.fetchUserById = ({ user_id }) => {
  return knex("users")
    .select("*")
    .where(user => {
      if (user_id) user.where({ user_id });
    });
};
