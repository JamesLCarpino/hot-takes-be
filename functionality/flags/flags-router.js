const router = require("express").Router();
const Flags = require("../flags/flags-model");
const restricted = require("../../authorized/restricted-model");

router.use(restricted);
//return flagged posts
router.get("/", (req, res) => {
  Flags.checkAllContent(req.query)
    .then((flags) => {
      console.log(req.jwt);

      if (req.jwt.admin === true) {
        res.status(200).json({ flagged_content: flags });
      } else {
        res.status(400).json({ message: "Admins only nerd." });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/comments", (req, res) => {
  Flags.getAllFlaggedComments(req.query)
    .then((comments) => {
      if (comments.length > 0 && req.jwt.admin === true) {
        res.status(200).json({ flagged_comments: comments });
      } else {
        res.status(404).json({ message: "No comments have been flagged" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/users", (req, res) => {
  Flags.getAllFlaggedUsers(req.query)
    .then((data) => {
      if (data.length > 0 && req.jwt.admin === true) {
        res.status(200).json({ flagged_users: data });
      } else {
        res.status(404).json({ message: "No users have been flagged" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/posts", (req, res) => {
  Flags.getAllFlaggedPosts(req.query)
    .then((data) => {
      if (data.length > 0 && req.jwt.admin === true) {
        res.status(200).json({ flagged_posts: data });
      } else {
        res.status(404).json({ message: "No posts have been flagged" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/comments", (req, res) => {
  Flags.addFlag(req.body);
});

module.exports = router;
