const router = require("express").Router();
const Posts = require("../posts/posts-model");

const restricted = require("../../authorized/restricted-model");
router.use(restricted);

router.get("/", (req, res) => {
  Posts.getAllPosts(req.query)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retreiving the post data!",
      });
    });
});
router.get("/top", (req, res) => {
  Posts.getTopPosts(req.query)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get("/new", (req, res) => {
  Posts.getNewestPosts(req.query)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get("/:id", (req, res) => {
  Posts.getPostsById(req.params.id)
    .then(([data]) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ message: "Post data not found!" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "There was an error while saving to the database" });
    });
});

router.post("/", (req, res) => {
  const postData = req.body;
  const { id } = req.jwt;
  console.log(postData);
  Posts.addPost({ ...postData, user_id: id })
    .then((post) => {
      res.status(201).json({ postData });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.delete("/:id", (req, res) => {
  Posts.deletePost(req.params.id)
    .then((data) => {
      if (data > 0) {
        res.status(200).json({ message: "This post has been deleted" });
      } else {
        res
          .status(404)
          .json({ message: "This post with the specified ID does not exist!" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "There was an error while saving to the database" });
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  if (!req.body.title || !req.body.content) {
    return res.status(400).json({
      message: "You are missing a required field of title or content",
    });
  }

  Posts.editPost(req.params.id, changes)
    .then((update) => {
      console.log(update, "this is the update");
      if (update === 0) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist " });
      } else {
        res.status(200).json(changes);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "There was an error while saving to the database.",
      });
    });
});

// router.post("/:id/upvote", (req, res) => {

// });

module.exports = router;
