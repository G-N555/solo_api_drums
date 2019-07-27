const knex = require("./knex"); //connection with knex.js file at same directly

module.exports = {
  getAll() {
    return knex("drums").select();
  },
  getOne(id) {
    return knex("drums")
      .where({ id })
      .first();
  },
  addOne(body) {
    const { id, name, brand, price, url } = body;
    return knex("drums")
      .insert([{ id, name, brand, price, url }])
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
  // replaceOne(body) {
  //   const { id, name, brand, price, url } = body;
  //   return knex("drums")
  //     .update({ id, name, brand, price, url })
  //     .then(() => {
  //       return knex("drums").select();
  //     });
  // },
  removeOne(id) {
    return knex("drums")
      .where({ id })
      .del()
      .then(() => {
        return knex("drums").select();
      });
  }
};
