exports.up = function(knex) {
  return knex.schema.createTable("drums", table => {
    table.increments("id").primary();
    table.text("name");
    table.text("brand");
    table.text("price");
    table.text("url");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("drums");
};
