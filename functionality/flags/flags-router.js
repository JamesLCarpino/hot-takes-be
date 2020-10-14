const router = require("express").Router();
const Flags = require("../flags/flags-model");
const restricted = require("../../authorized/restricted-model");

//return flagged posts
router.get("/", (req, res) => {
  Flags.getAllFlaggedContent(req.query)
    .then((flags) => {
      //console.log(flags.flagged);
      if (flags) {
        res.status(200).json({ flags });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
