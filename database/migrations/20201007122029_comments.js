exports.up = function (knex) {
  return knex.schema.createTable("comments", (tbl) => {
    tbl.increments();
    tbl.string("content").notNullable();
    tbl.timestamp("created").defaultTo(knex.fn.now());

    tbl
      .integer("post_id")
      .notNullable()
      .references("id")
      .inTable("posts")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl
      .integer("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("comments");
};
