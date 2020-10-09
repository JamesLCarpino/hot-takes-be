const db = require("../../database/dbConfig");

module.exports = {
  getPostsById,
  getPostsByUserId,
  addPost,
  deletePost,
  editPost,
  getAllPosts,
};
function getAllPosts() {
  return db("posts");
}

function getPostsById(id) {
  return db("posts").where({ id });
}

function getPostsByUserId(user_id) {
  return db("posts").where({ user_id: id });
}

function addPost(newPost) {
  return db("posts")
    .insert(newPost, "id")
    .then((ids) => {
      return getPostsById(ids);
    });
}

function deletePost(id) {
  return db("posts").where("id", id).del();
}

function editPost(id, changes) {
  return db("posts").where({ id }).update(changes);
}
