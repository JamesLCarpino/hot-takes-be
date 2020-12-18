exports.up = function (knex) {
  return knex.schema.createTable("comments", (tbl) => {
    // tbl.increments();
    tbl.increments();
    tbl.string("content").notNullable();
    tbl.boolean("flagged").defaultTo(false);
    tbl.specificType("votes", "TEXT[]").defaultTo("{}");
    tbl.timestamp("created").defaultTo(knex.fn.now());

    tbl
      .integer("post_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("posts")
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
  return knex.schema.dropTable("comments");
};
