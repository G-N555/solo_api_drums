// Update with your config settings.

module.exports = {
  development: {
    client: "pg",
    connection: "postgres://localhost/drumshop"
  },
  test: {
    client: "pg",
    connection: "postgres://localhost/test-drumshop"
  }
};
