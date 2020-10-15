const router = require("express").Router();
const Votes = require("../votes/votes-model");
//do the votes need to be restricted? will posts be restricted?
router.use(restricted);

module.exports = router;
