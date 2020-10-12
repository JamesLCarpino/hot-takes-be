const db = require("../../database/dbConfig");

module.exports = {
  getTopPost,
  getLowestPost,

  //upvote CRUD
  addUpVote,
  removeUpVote,

  //downvote CRUD
  addDownVote,
  removeDownVote,

  // I guess that's all we need? Posts only update by adding and subtracting from the value in the
};
