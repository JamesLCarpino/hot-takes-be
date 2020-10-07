exports.up = function (knex) {
  return knex.schema
    .raw()
    .createTable("users", (tbl) => {
      tbl.increments();
      tbl.string("username").notNullable().unique().index();
      tbl.string("email").notNullable().unique();
      tbl.string("password").notNullable();
      tbl.timestamps(true, true);
      tbl
        .integer("roleId")
        .unsigned()
        .references("roles.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    })
    .createTable("roles", (tbl) => {
      tbl.increments();
      tbl.string("name").notNullable().unique();
    })
    .createTable("posts", (tbl) => {
      tbl.increments();
      tbl.string("title");
      tbl.string("");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
