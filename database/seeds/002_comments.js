exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("comments")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("comments").insert([
        {
          id: 1,
          content: "Comment Content 5 updated content",
          user_id: 1,
          post_id: 1,
        },
        {
          id: 2,
          content: "Comment Content 5 updated content",
          user_id: 4,
          post_id: 1,
        },
        {
          id: 3,
          content: "Comment Content 5 updated content",
          user_id: 3,
          post_id: 1,
        },
        {
          id: 4,
          content: "Comment Content 5 updated content",
          user_id: 2,
          post_id: 1,
        },
        {
          id: 5,
          content: "Comment Content 5 updated content",
          user_id: 5,
          post_id: 2,
        },
        {
          id: 6,
          content: "Comment Content 5 updated content",
          user_id: 5,
          post_id: 3,
        },
        {
          id: 7,
          content: "Comment Content 5 updated content",
          user_id: 5,
          post_id: 1,
        },
        {
          id: 8,
          content: "Comment Content 5 updated content",
          user_id: 4,
          post_id: 1,
        },
      ]);
    });
};
