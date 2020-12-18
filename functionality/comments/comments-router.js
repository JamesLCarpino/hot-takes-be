const router = require("express").Router();
const Comments = require("../comments/comments-model");
const restricted = require("../../authorized/restricted-model");
router.use(restricted);

router.get("/", (req, res) => {
  Comments.getAllComments(req.query)

    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Error retreiving comments from server" });
    });
});

router.get("/:id", (req, res) => {
  Comments.getCommentsById(req.params.id)
    .then(([data]) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ message: "comment data not found!" });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
});

router.get("/post/:id", (req, res) => {
  let params = req.params.id;

  Comments.getAllCommentsByPostId(params)
    .then((data) => {
      if (data) {
        console.log(data);
        res.status(200).json(data);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
});

//should post straight to the post id
router.post("/:id", (req, res) => {
  const commentData = req.body;
  const { id } = req.jwt;
  let post_id = req.params.id;

  console.log("user_id", id);
  console.log("comment data", commentData);
  console.log("post_id", post_id);

  Comments.addComment({ ...commentData, user_id: id, post_id: post_id })
    .then((comment) => {
      res.status(201).json({ comment });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  if (!changes.content) {
    return res.status(400).json({
      message: "You are missing a required field",
    });
  }
  Comments.editComment(req.params.id, changes)
    .then((update) => {
      if (update === 0) {
        res.status(404).json({
          message: "This comment wasn't updated",
        });
      } else {
        res.status(200).json(update);
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error server side",
      });
    });
});

module.exports = router;
