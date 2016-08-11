/**
 * Created by orizu on 09/08/2016.
 */

var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  title: String,
  link: String,
  upvotes: { type: Number, default: 0 },
  // Array of ObjectId references to Comments
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});

// Add upvoting to the schema
PostSchema.methods.upvote = function (cb) {
  this.upvotes += 1;
  this.save(cb);
};

mongoose.model('Post', PostSchema);