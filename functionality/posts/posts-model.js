const db = require("../../database/dbConfig");

module.exports = {
  getPostsById,
  getPostsByUserId,
  addPost,
  deletePost,
  editPost,
  getAllPosts,
  getAllPostsByUser,
  getTopPosts,
  getNewestPosts,
  upvotePost,
};
function getAllPosts() {
  return db("posts")
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
      "users.admin",
      "posts.votes"
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
  return db("posts").where("id", id).returning("id").del();
}

function editPost(id, changes) {
  return db("posts").where({ id }).update(changes);
}

function upvotePost(id, upvote) {
  console.log(upvote);
  return db("posts").where({ id }).update(upvote);
}

function getAllPostsByUser(id) {
  return db("posts")
    .where("posts.id", id)
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

function getTopPosts() {
  return db("posts")
    .orderBy("votes", "desc")
    .join("users", "posts.user_id", "users.id")
    .select(
      "posts.id",
      "posts.votes",
      "posts.title",
      "posts.content",
      "posts.created",
      "users.username",
      "users.admin"
    );
}

function getNewestPosts() {
  return db("posts")
    .orderBy("created", "desc")
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
