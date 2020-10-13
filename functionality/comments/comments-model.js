const db = require("../../database/dbConfig");

module.exports = {
  getAllComments,
  getCommentsById,
  addComment,

  deleteComment,
  editComment,
  getAllCommentsByPostId,
};
function getAllComments() {
  return db("comments");
}

function getCommentsById(id) {
  return db("comments")
    .where("comments.id", id)

    .join("users", "comments.user_id", "users.id")
    .join("posts", "comments.post_id", "posts.id")
    .select(
      "users.username as Username:",
      "users.admin as Admin Status:",
      "comments.id as Comment ID:",

      "comments.content as Comment:",
      "comments.created as Comment Created At:",
      "posts.title as Post Title",
      "posts.created as Post Created At:",
      "posts.content as Post:"
    );
}

function addComment(newComment) {
  return db("comments")
    .insert(newComment, "id")
    .then((ids) => {
      return getCommentsById(ids);
    });
}

function deleteComment(id) {
  return db("comments").where("id", id).del();
}

function editComment(id, changes) {
  return db("comments").where({ id }).update(changes);
}

function getAllCommentsByPostId(id) {
  return db("comments")
    .where({ post_id: id })
    .join("posts", "comments.post_id", "posts.id")
    .join("users", "comments.user_id", "users.id")
    .select(
      "comments.id",
      "comments.content as Comment:",
      "posts.id as Post ID:",
      "posts.content as Post:",
      "users.username as Author:"
    );
}
