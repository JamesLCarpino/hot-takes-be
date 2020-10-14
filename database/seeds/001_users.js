exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          username: "james",
          password: "pass",
          email: "test@email.com",
          admin: 1,
        },
        {
          id: 2,
          username: "test1",
          password: "pass",
          email: "test1@email.com",
          admin: 0,
        },
        {
          id: 3,
          username: "test2",
          password: "pass",
          email: "test2@email.com",
          admin: 0,
        },
        {
          id: 4,
          username: "test3",
          password: "pass",
          email: "test3@email.com",
          admin: 1,
        },
        {
          id: 5,
          username: "test4",
          password: "pass",
          email: "test4@email.com",
          admin: 0,
        },
        {
          id: 6,
          username: "test6",
          password: "pass",
          email: "test6@email.com",
          admin: 0,
        },
        {
          id: 7,
          username: "test7",
          password: "pass",
          email: "test7@email.com",
          admin: 0,
        },
      ]);
    });
};
