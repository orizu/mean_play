/**
 * Created by orizu on 09/08/2016.
 */

var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  body: String,
  author: String,
  upvotes: { type: Number, default: 0 },
  // 12 byte ObjectId reference to parent Post
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
});

// Add upvoting to the schema
CommentSchema.methods.upvote = function (cb) {
  this.upvotes += 1;
  this.save(cb);
};

mongoose.model('Comment', CommentSchema);