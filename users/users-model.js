const db = require("../database/dbConfig");

module.exports = {
  find,
  add,
  findBy,
  deleteUser,
  updateUser,
  findUserId,
  getAllUsersPosts,
  getAllUsersComments,
};

function find() {
  return db("users").select("id", "username", "admin", "user_created");
}

function add(user) {
  return db("users").insert(user, "id");
}

function findUserId(id) {
  return db("users")
    .where({ id })
    .select("id", "username", "admin", "user_created");
}

function findBy(filter) {
  //console.log(id)
  return db("users").where(filter);
}

function deleteUser(id) {
  return db("users").where("id", id).del();
}

function updateUser(changes, id) {
  return db("users").where({ id }).update(changes);
}

function getAllUsersComments(user_id) {
  return db("comments").where({ user_id: user_id });
}

function getAllUsersPosts(user_id) {
  return db("posts")
    .where({ user_id: user_id })
    .join("users", "posts.user_id", "users.id")
    .select(
      "posts.id",
      "posts.title",
      "posts.content",
      "posts.created",
      "users.username",
      "users.admin",
      "posts.votes"
    );
}
