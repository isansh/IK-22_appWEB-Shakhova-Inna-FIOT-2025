const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const posts = [];

app.get("/", (req, res) => {
  res.render("home", { posts });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const post = {
    id: Date.now().toString(),
    title: req.body.postTitle,
    content: req.body.postBody,
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:id", (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  if (post) {
    res.render("post", { post });
  } else {
    res.redirect("/");
  }
});

app.get("/edit/:id", (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  if (post) {
    res.render("edit", { post });
  } else {
    res.redirect("/");
  }
});

app.post("/edit/:id", (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  if (post) {
    post.title = req.body.postTitle;
    post.content = req.body.postBody;
  }
  res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
  const index = posts.findIndex(p => p.id === req.params.id);
  if (index !== -1) {
    posts.splice(index, 1);
  }
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
