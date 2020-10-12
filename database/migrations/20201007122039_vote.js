exports.up = function (knex) {
  return knex.schema
    .createTable("up_vote", (tbl) => {
      //tbl.increments();
      tbl.primary(["user_id", "post_id", "comment_id"]);
      tbl.boolean("up_voted").defaultTo(false);
      tbl.integer("amount").defaultTo(0);
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

      tbl
        .integer("commment_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("comments")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("down_vote", (tbl) => {
      tbl.increments();
      // tbl.primary(["user_id", "post_id", "comment_id"]);
      tbl.boolean("down_voted").defaultTo(false);
      tbl.integer("amount").defaultTo(0);

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
  return knex.schema
    .dropTableIfExists("up_vote")
    .dropTableIfExists("down_vote");
};
