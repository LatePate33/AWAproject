var express = require('express');
var router = express.Router();
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const validateToken = require('../auth/validateToken');
  
var number = 1; //not ideal way, but giving id's to posts
// if server restarts number starts from 1
// Could / Should have used the automatic id Mongo creates, but used week13 source code as a base

// Find all the CodeSnippets from MongoDB project.posts and send them to client
router.get('/data', function(req, res, next) {
  Post.find({})
  .then(posts => {
    console.log(posts)
    res.json(posts)
  })
  .catch(error => {
    console.log(error.message)
  })
});
    
// Create a post / CodeSnippet to project.posts after token validation
router.post('/createPost', validateToken, function(req, res, next) {
  Post.create(
    {
      id: number,
      name: req.body.post
    }
  );
  console.log(number);
  number++; // increase the id number
  console.log(number);
  res.json({message: "Success"});
});

// Create a comment to a corresponding post through the id after token validation
router.post('/createComment', validateToken, function(req, res, next) {
  console.log(req.body);
  Comment.create(
    {
      id: req.body.id,
      name: req.body.comment
    }
  );
  res.json({message: "Success"});
});

// Find all the comments with the corresponding id to the post from MongoDB project.comments and send them to client
router.get('/comments/:id', function(req, res, next) {
  Comment.find({id: req.params.id})
  .then(comments => {
    console.log(comments)
    res.json(comments)
  })
  .catch(error => {
    console.log(error.message)
  })
});

// Find the corresponding CodeSnippet from MongoDB project.posts and send it to client
router.get('/data/:id', function(req, res, next) {
  Post.findOne({id: req.params.id})
  .then(posts => {
    console.log(posts)
    res.json(posts)
  })
  .catch(error => {
    console.log(error.message)
  })
});

module.exports = router;
