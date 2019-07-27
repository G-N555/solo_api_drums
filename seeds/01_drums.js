const drums = require("../drums");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("drums")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("drums").insert(drums);
    });
};
