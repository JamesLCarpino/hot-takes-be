const { post } = require("../../api/server");
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
  downvotePost,
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

async function upvotePost(id, user_name) {
  // console.log("from model", id);
  // return db("posts").where({ id }).insert(user_id).returning("posts");
  const post_find = await getPostsById(id);
  console.log(post_find, "promise of the post");

  if (post_find[0].votes.includes(user_name)) {
    return { err: "you already upvoted this you stupid fuck" };
  } else {
    return db("posts")
      .where("id", id)
      .returning("*")
      .update({
        votes: db.raw("array_append(votes, ?)", [user_name]),
      });
  }
}

async function downvotePost(id, user_name) {
  // console.log("from model", id);
  // return db("posts").where({ id }).insert(user_id).returning("posts");
  const post_find = await getPostsById(id);
  console.log(post_find, "promise of the post");

  if (post_find[0].votes.includes(user_name)) {
    return db("posts")
      .where("id", id)
      .returning("*")
      .update({
        votes: db.raw("array_remove(votes, ?)", [user_name]),
      });
  } else {
    return { err: "you already downvoted this you stupid fuck" };
  }
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
