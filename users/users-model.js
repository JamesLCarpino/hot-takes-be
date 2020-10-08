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
  return db("users").select("username", "admin", "user_created");
}

function add(user) {
  return db("users").insert(user, "id");
}

function findUserId(id) {
  return db("users").where({ id });
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
  return db("posts").where({ user_id: user_id });
}
