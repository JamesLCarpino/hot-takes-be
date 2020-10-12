exports.up = function (knex) {
  return knex.schema.createTable("flag", (tbl) => {
    tbl.primary(["post_id", "comment_id", "user_id"]);
    tbl.boolean("flagged").defaultTo(false);

    tbl
      .integer("post_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("posts")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    tbl
      .integer("comment_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("comments")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    tbl
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("flagged");
};
