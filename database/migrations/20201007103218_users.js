exports.up = function (knex) {
  return knex.schema.createTable("users", (tbl) => {
    tbl.increments();
    tbl.varchar("username").notNullable().unique().index();
    tbl.varchar("email").notNullable().unique();
    tbl.varchar("password").notNullable();
    tbl.boolean("admin").defaultTo(0);
    tbl.timestamp("user_created").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
