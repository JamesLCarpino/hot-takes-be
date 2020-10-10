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

router.post("/", (req, res) => {
  const commentData = req.body;
  Comments.addComment(commentData)
    .then((comment) => {
      res.status(201).json({ comment });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  if (!req.comment_content) {
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
