const router = require("express").Router();
const Posts = require("../posts/posts-model");

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

//keeping this here, currently this functionality exists in the user route
// router.get("/userposts/:user_id", (req, res) => {
//   Posts.getPostsByUserId(req.params.id)
//     .then(([data]) => {
//       if (data) {
//         res.status(200).json(data);
//       } else {
//         res.status(404).json({ message: "Post by this user ID do not exist" });
//       }
//     })
//     .catch((err) => {
//       res
//         .status(500)
//         .json({ message: "There was an error connecting to database" });
//     });
// });

router.post("/", (req, res) => {
  const postData = req.body;
  Posts.addPost(postData)
    .then((post) => {
      res.status(201).json({ post });
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
        res.status(200).json(update);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "There was an error while saving to the database.",
      });
    });
});

//comment stuff

router.get("/:id/comments", (req, res) => {
  Posts.findCommentById(req.params.id)
    .then(([data]) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "There was an error while saving to the database" });
    });
});

router.post("/:post_id/comments", (req, res) => {
  const { post_id } = req.params;
  const { text } = req.body;
  if (text === "" || typeof text != "string") {
    return res
      .status(400)
      .json({ message: "Please provide text for the comment." });
  }

  Posts.insertComment({ post_id, text })
    .then(({ id: comment_id }) => {
      Posts.findCommentById(comment_id).then(([comment]) => {
        if (comment) {
          res.status(200).json(comment);
        } else {
          res.status(404).json({ message: "This does not exist" });
        }
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "There was an error while saving to the database" });
    });
});

module.exports = router;
