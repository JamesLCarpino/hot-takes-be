const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

//routers
const userRouter = require("../users/users-router");
const authRouter = require("../authorized/auth-router");
const commentsRouter = require("../functionality/comments/comments-router");
const postRouter = require("../functionality/posts/posts-router");
const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/users", userRouter);
server.use("/comments", commentsRouter);
server.use("/auth", authRouter);
server.use("/posts", postRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "up and running" });
});

module.exports = server;
