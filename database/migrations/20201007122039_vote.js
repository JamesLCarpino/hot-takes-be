exports.up = function (knex) {
  return knex.schema.createTable("vote", (tbl) => {
    tbl.increments();
    // tbl.primary(["post_id", "comment_id"]);
    tbl.boolean("up_voted").defaultTo(false);
    tbl.boolean("down_voted");
    tbl.integer("amount_up").defaultTo(0);
    tbl.integer("amount_down").defaultTo(0);
    tbl
      .integer("post_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("posts")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    tbl
      .integer("commment_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("comments")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("vote");
};
