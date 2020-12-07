exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("posts")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("posts").insert([
        {
          title: "New Post user 1",
          content: "Post Content 1",
          user_id: 1,
          flagged: true,
          votes: [],
        },
        {
          title: "New Post user 1 # 2 ",
          content: "Post Content",
          user_id: 1,
          votes: [],
        },
        {
          title: "New Post user 2",
          content: "Post Content",
          user_id: 2,
          votes: [],
        },
        {
          title: "New Post user 4",
          content: "Post Content",
          user_id: 4,
          votes: [],
        },
        {
          title: "New Post user 4 post 4",
          content: "Post Content",
          user_id: 4,
          votes: [],
        },
        {
          title: "New Post user 4 # 4",
          content: "Post Content",
          user_id: 4,
          flagged: true,
          votes: [],
        },
      ]);
    });
};
