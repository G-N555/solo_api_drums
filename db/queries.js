const knex = require("./knex"); //connection with knex.js file at same directly

module.exports = {
  getAll() {
    return knex("drums").select();
  },
  getOneById(id) {
    return knex("drums")
      .where({ id })
      .first();
  },
  getOneByName(name) {
    return knex("drums")
      .where("name", "like", `%${name}%`)
      .select();
  },
  addOne(body) {
    const { name, brand, price, url } = body;
    return knex("drums")
      .insert([{ name, brand, price, url }])
      .then(() => {
        return knex("drums").select();
      });
  },
  updateOne(id, body) {
    const { name, brand, price, url } = body;
    return knex("drums")
      .where({ id })
      .update({ name, brand, price, url })
      .then(() => {
        return knex("drums")
          .where({ id })
          .select();
      });
  },
  deleteOneById(id) {
    return knex("drums")
      .where({ id })
      .del()
      .then(() => {
        return knex("drums").select();
      });
  },
  deleteOneByName(name) {
    const newName = String(name);
    return knex("drums")
      .where({ name: newName })
      .select()
      .del()
      .then(() => {
        return knex("drums").select();
      });
  }
};
