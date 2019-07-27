exports.up = function(knex) {
  return knex.schema.createTable("drums", table => {
    table.increments();
    table.text("name");
    table.text("brand");
    table.integer("price");
    table.text("url");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("drums");
};
