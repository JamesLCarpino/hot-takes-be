exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("comments")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("comments").insert([
        {
          content: "Comment Content 1 from user 1 on post 1",
          user_id: 1,
          post_id: 1,
          flagged: true,
        },
        {
          content: "Comment Content 2 from user 2 on post 1",
          user_id: 4,
          post_id: 1,
        },
        {
          content: "Comment Content 3 from user 3 on post 1",
          user_id: 3,
          post_id: 1,
        },
        {
          content: "Comment Content 4 from user 2 on post 1",
          user_id: 2,
          post_id: 1,
        },
        {
          content: "Comment Content 5 from user 5 on post 2",
          user_id: 5,

          post_id: 2,
          flagged: true,
        },
        {
          content: "Comment Content 6 from user 5 on post 3",
          user_id: 5,
          post_id: 3,
        },
        {
          content: "Comment Content 7 from user 5 on post 1",
          user_id: 5,
          post_id: 1,
          flagged: true,
        },
        {
          content: "Comment Content 8 from user 4 on post 1",
          user_id: 4,
          post_id: 1,
        },
      ]);
    });
};
