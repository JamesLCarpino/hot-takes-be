const db = require("../../database/dbConfig");

module.exports = {
  getPostsById,
  getPostsByUserId,
  addPost,
  deletePost,
  editPost,
  getAllPosts,
  findCommentsById,
};
function getAllPosts() {
  return db("posts");
}

function getPostsById(id) {
  return db("posts")
    .where("posts.id", id)
    .join("users", "posts.user_id", "users.id")
    .select(
      "posts.id",
      "posts.title",
      "posts.content",
      "posts.created",
      "users.username",
      "users.admin"
    );
}

function getPostsByUserId(user_id) {
  return db("posts").where({ user_id: id });
}

function addPost(newPost) {
  return db("posts")
    .insert(newPost, "id")
    .then((id) => {
      getPostsById(id);
    });
}

function deletePost(id) {
  return db("posts").where("id", id).del();
}

function editPost(id, changes) {
  return db("posts").where({ id }).update(changes);
}

//comment stuff
function findCommentsById(id) {
  return db("comments").where("post_id", id);
}
