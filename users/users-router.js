const router = require("express").Router();

const Users = require("./users-model");

const restricted = require("../authorized/restricted-model");
router.use(restricted);

router.get("/", (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json({ users, jwt: req.jwt });
    })
    .catch((err) => {
      res.status(403).json(err, { message: "you cant enter" });
    });
});

router.get("/:id", (req, res) => {
  Users.findUserId(req.params.id)
    .then((users) => {
      if (users) {
        res.status(200).json(users);
      } else {
        res
          .status(400)
          .json({ message: "this specific user could not be found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  Users.findBy(id)
    .then((updates) => {
      if (updates) {
        Users.updateUser(changes, id).then((updatedUser) => {
          res.json(updatedUser);
        });
      } else {
        res.status(404).json({ message: "could not update this user by id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.delete("/:id", (req, res) => {
  Users.deleteUser(req.params.id).then((removed) => {
    if (removed > 0) {
      res.status(200).json({ removed: removed });
    } else {
      res.status(500).json({
        message: "This user failed to delete",
      });
    }
  });
});

//get users comments
router.get("/:id/comments", (req, res) => {});

module.exports = router;
