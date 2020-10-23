const db = require("../../database/dbConfig");

module.exports = {
  getTopVotedPost,
  getLowestVotedPost,
  orderPostsVotesByHighest,
  orderPostVotesByLowest,

  getTopVotedComment,
  getLowestVotedComment,
  orderCommentVotesByHighest,
  orderCommentsVotesByLowest,
};

function getTopVotedPost() {
  return db("posts");
}
