exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("posts")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("posts").insert([
        {
          id: 1,
          title: "New Post user 1",
          content: "Post Content 1",
          user_id: 1,
          flagged: true,
          votes: 500,
        },
        {
          id: 2,
          title: "New Post user 1 # 2 ",
          content: "Post Content",
          user_id: 1,
          votes: 2,
        },
        {
          id: 3,
          title: "New Post user 2",
          content: "Post Content",
          user_id: 2,
          votes: 10000,
        },
        {
          id: 4,
          title: "New Post user 4",
          content: "Post Content",
          user_id: 4,
          votes: 9,
        },
        {
          id: 5,
          title: "New Post user 4 post 4",
          content: "Post Content",
          user_id: 4,
          votes: 1,
        },
        {
          id: 6,
          title: "New Post user 4 # 4",
          content: "Post Content",
          user_id: 4,
          flagged: true,
          votes: 2,
        },
      ]);
    });
};
