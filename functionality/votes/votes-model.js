const db = require("../../database/dbConfig");

module.exports = {
  getTopVotedPost,
  getLowestVotedPost,
  get,
};

function getTopVotedPost() {
  return db("posts");
}
