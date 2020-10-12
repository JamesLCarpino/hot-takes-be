const db = require("../../database/dbConfig");

module.exports = {
  getAllFlaggedComments,
  getAllFlaggedContent,
  getAllFlaggedPosts,
  getAllFlaggedUsers,
  removeFlag,
  //does update flag toggle on and off? couldn't we handle this client side?
  updateFlag,
  //flagging operation - would need to be a post request to the BE
  markFlagged,

  //are these all gets?
  //probably need to delete a flag?
};
