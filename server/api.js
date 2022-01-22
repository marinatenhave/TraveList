/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const Account = require("./models/account");
const Comment = require("./models/comment");
const Post = require("./models/post");
const Item = require("./models/item");
const Preferencespage = require("./models/preferencespage");
const List = require("./models/packinglist");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.get("/mylists", (req, res) => {
  List.find({ user: req.query.user }).then((lists) => res.send(lists));
});

router.get("/comment", (req, res) => {
  console.log(req.query);
  Comment.find({
    parent: req.query.parent,
  }).then((comments) => {
    res.send(comments);
  });
});

router.get("/myposts", (req, res) => {
  Post.find({ parent: req.query.parent }).then((posts) => res.send(posts));
});

router.get("/allposts", (req, res) => {
  Post.find({}).then((posts) => res.send(posts));
});

// router.get("/allposts", (req, res) => {
//   Post.find({}).sort({date: -1}).then((posts) => res.send(posts))
// });

router.post("/newlist", (req, res) => {
  const newList = new List({
    user: req.body.user,
    bio: req.body.bio,
    title: req.body.title,
  });
  //want to use creator name?

  newList.save().then((list) => res.send(list));
});

router.post("/newpost", (req, res) => {
  const newPost = new Post({
    list: req.body.list_id,
    destination: req.body.destination,
  });
  //make creator name a constant thing?

  newPost.save().then((post) => res.send(post));
});

router.post("/comment", (req, res) => {
  const newComment = new Comment({
    creator_id: req.body.creator_id,
    parent: req.body.parent,
    content: req.body.content,
  });

  newComment.save().then((comment) => res.send(comment));
});

router.get("/aboutus", (req, res) => {
  res.send("aboutus");
});

router.get("/contactus", (req, res) => {
  res.send("contactus");
});

router.get("/home", (req, res) => {
  res.send("home");
});

router.post("/login", (req, res) => {
  const newAccount = new Account({
    name: req.body.name,
    googleid: req.body.googleid,
    password: req.body.password,
    bio: req.body.bio,
  });
  newAccount.save().then((account) => res.send(account));
});

router.get("/account", (req, res) => {
  Account.find({ googleid: req.query.parent }).then((account) => res.send(account));
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
