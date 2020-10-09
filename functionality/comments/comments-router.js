const router = require("express").Router();

const restricted = require("../authorized/restricted-model");
router.use(restricted);

module.exports = router;
