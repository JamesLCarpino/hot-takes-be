const router = require("express").Router();

const Users = require("./users-model");

const restricted = require("../authorized/restricted-model");
router.use(restricted);

router.get("/", (req, res) => {
  Users.find()
    .then((users) => {
      users = JSON.parse(users);
      console.log(data);

      if (users.admin === true) {
        res.status(201).json({ users });
      } else {
        res
          .status(200)
          .json({ message: "Please contact an admin to get user list" });
      }
    })
    .catch((err) => {
      res.status(403).json(err, { message: "you cant enter" });
    });
});

//get users by id
router.get("/:id", (req, res) => {
  Users.findUserId(req.params.id)
    .then((users) => {
      if (users.length > 0) {
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

//edit user? why would I need this? leaving it, maybe the way to have admins allow editing for changing admin privalages.
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

//delete user by id
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

//get users comments by users id
router.get("/:id/comments", (req, res) => {
  Users.getAllUsersComments(req.params.id)
    .then((user_comments) => {
      if (user_comments) {
        res.status(200).json(user_comments);
      } else {
        res.status(404).json({ message: "This user has no comments" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get("/:id/posts", (req, res) => {
  Users.getAllUsersPosts(req.params.id)
    .then((user_posts) => {
      if (user_posts) {
        res.status(200).json(user_posts);
      } else {
        res.status(404).json({ message: "This user has not posted yet." });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
