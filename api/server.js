const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

//routers
const userRouter = require("../users/users-router");
const authRouter = require("../authorized/auth-router");
const commentsRouter = require("../functionality/comments/comments-router");
const postRouter = require("../functionality/posts/posts-router");
// const votesRouter = require("../functionality/votes/votes-router");
const flagsRouter = require("../functionality/flags/flags-router");
const server = express();

server.use(helmet());
server.use(express.json());
server.use(
  cors({
    origin: "*",
  })
);

server.use("/users", userRouter);
server.use("/comments", commentsRouter);
server.use("/auth", authRouter);
server.use("/posts", postRouter);
//figure out what if any routes need to be used for the votes. do they need to be stand alone, or should they be included on the posts/comments?

// server.use("/votes", votesRouter);
server.use("/flags", flagsRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "up and running" });
});

module.exports = server;
