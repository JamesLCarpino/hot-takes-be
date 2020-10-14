const router = require("express").Router();
const Flags = require("../flags/flags-model");
const restricted = require("../../authorized/restricted-model");

//return flagged posts
router.get("/", (req, res) => {
  Flags.checkAllContent(req.query)
    .then((flags) => {
      console.log(flags);
      if (flags) {
        res.status(200).json({ flagged_content: flags });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/comments", (req, res) => {
  Flags.getAllFlaggedComments(req.query)
    .then((comments) => {
      if (comments) {
        res.status(200).json({ flagged_comments: comments });
      } else {
        res.status(404).json({ message: "No comments have been flagged" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
