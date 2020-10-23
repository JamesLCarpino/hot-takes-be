const db = require("../../database/dbConfig");

module.exports = {
  getAllFlaggedComments,
  checkAllContent,
  getAllFlaggedPosts,
  getAllFlaggedUsers,
};

function checkAllContent() {
  return db("comments")
    .join("users", "comments.user_id", "users.id")
    .join("posts", "comments.post_id", "posts.id")
    .where("users.flagged", "=", "true")
    .orWhere("comments.flagged", "=", "true")
    .orWhere("posts.flagged", "=", "true")
    .select(
      "users.username as Username:",
      // "users.admin as Admin Status:",
      "users.flagged as User is Flagged:",
      "comments.id as Comment ID:",
      // "comments.content as Comment:",
      // "comments.created as Comment Created At:",
      "comments.flagged as Comment been flagged:",
      // "posts.title as Post Title",
      // "posts.created as Post Created At:",
      "posts.id as Post ID:",
      // "posts.content as Post:",
      "posts.flagged as Post been flagged:"
    );
}

function getAllFlaggedComments() {
  return db("comments")
    .join("users", "comments.user_id", "users.id")
    .where("comments.flagged", "=", "true")
    .select(
      "users.username as Username:",
      "comments.id as Comment ID:",
      "comments.content as Comment:",
      "comments.created as Comment Created At:",
      "comments.flagged as Comment been flagged:"
    );
}
function getAllFlaggedPosts() {
  return db("comments")
    .join("users", "comments.user_id", "users.id")
    .join("posts", "comments.post_id", "posts.id")
    .where("posts.flagged", "=", "true")
    .select(
      "users.username as Username:",

      "posts.title as Post Title",
      "posts.created as Post Created At:",
      "posts.id as Post ID:",
      "posts.content as Post:",
      "posts.flagged as Post been flagged:"
    );
}
function getAllFlaggedUsers() {
  return db("comments")
    .join("users", "comments.user_id", "users.id")
    .where("users.flagged", "=", "true")
    .select("users.username as Username:", "users.flagged as User is Flagged:");
}
