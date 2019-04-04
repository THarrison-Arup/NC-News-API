const knex = require("../db/connection");

exports.fetchUsers = () => {
  return knex("users")
    .select("*")
    .returning("*");
};