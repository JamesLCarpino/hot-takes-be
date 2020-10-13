const db = require("../../database/dbConfig");

module.exports = {
  // getAllFlaggedComments,
  getAllFlaggedContent,
  // getAllFlaggedPosts,
  // getAllFlaggedUsers,
  // removeFlag,
  //does update flag toggle on and off? couldn't we handle this client side?
  // updateFlag,
  //flagging operation - would need to be a post request to the BE
  // markFlagged,

  //are these all gets?
  //probably need to delete a flag?
};

function getAllFlaggedContent() {
  return db("comments")
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
