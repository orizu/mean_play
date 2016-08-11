var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

// Include our custom schemas
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

// Use the express get() method to define '/posts' route
// and anon request handler to query the model for all posts.

router.get('/posts', function (req, res, next) {
  // Use Post model to find all posts
  Post.find(function (err, posts) {
    if (err) { return next(err); }
    // Send the retrieved posts back to the client
    res.json(posts);
  });
});

// When defining routes with Express.js,
// router handler function params:
//   req = all info about request, incl. fields,
//   res = object to respond to the client.
//   next = ??

// Use post to define a route for creating new posts

router.post('/posts', function (req, res, next) {
  // Create Post and save in database via model
  var post = new Post(req.body);
  post.save(function (err, post) {
    if (err) { return next(err); }

    // Send the saved post back to the client
    res.json(post);
  });
});

// Define a ':post' paramater handler by overloading typical request
// handler with an id param (akin to its semantic value) mapped to the :post param
// This middleware handler then hands off to the route handlers below
router.param('post', function (req, res, next, id) {
  var query = Post.findById(id);

  query.exec(function (err, post) {
    if (err) { return next(err); }
    if (!post) { return next(new Error('Can\'t find post!'));}

    req.post = post;
    return next();
  });
});

// :post param is handled above before hand off to this Url handler
// which responds with the post previously attached to the request
router.get('/posts/:post', function (req, res, next) {
  // res.json(req.post);

  // populate() loads the post's comments
  req.post.populate('comments', function (err, post) {
    if (err) { return next(err); }
    res.json(post);
  });
});

//
router.put('/posts/:post/upvote', function (req, res, next) {
  req.post.upvote(function (err, post) {
    if (err) { return next(err); }
    res.json(post);
  });
});


// Comments
// Use post to define a route for creating new comments posts
// Once again the parent post is added to the req via the param handler
router.post('/posts/:post/comments', function (req, res, next) {

  // Creates a document instance of the Comment model
  // using data fields in the request body
  var comment = new Comment(req.body);

  // Use the post identified via the router param handler
  comment.post = req.post;

  //
  comment.save(function (err, comment) {
    if (err) { return next(err); }

    req.post.comments.push(comment);
    req.post.save(function (err, post) {
      if (err) { return next(err); }
      // Send the saved post back to the client
      res.json(comment);

    });
  });
});


// Comment param handler
router.param('comment', function (req, res, next, id) {
  var query = Comment.findById(id);

  query.exec(function (err, comment) {
    if (err) { return next(err); }
    if (!comment) { return next(new Error('Can\'t find comment!'));}
    req.comment = comment;
    return next();
  });
});


// :comment param is handled above before hand off to this Url handler
// which responds with the comment previously attached to the request
router.get('/posts/:post/comments/:comment', function (req, res) {
  res.json(req.comment);
});


router.put('/posts/:post/comments/:comment/upvote', function (req, res, next) {
  req.comment.upvote(function (err, comment) {
    if (err) { return next(err); }
    res.json(comment);
  });
});

