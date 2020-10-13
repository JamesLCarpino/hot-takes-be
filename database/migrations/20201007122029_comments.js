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

    // tbl
    //   .integer("upvote_id")
    //   .notNullable()
    //   .references("id")
    //   .inTable("up_vote")
    //   .onDelete("CASCADE")
    //   .onUpdate("CASCADE");

    // tbl
    //   .integer("downvote_id")
    //   .notNullable()
    //   .references("id")
    //   .inTable("down_vote")
    //   .onDelete("CASCADE")
    //   .onUpdate("CASCADE");

    // tbl
    //   .integer("flag_id")
    //   .notNullable()
    //   .references("id")
    //   .inTable("flag")
    //   .onDelete("CASCADE")
    //   .onUpdate("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("comments");
};
