const Comment = require("../models/Comment");
const Post = require("../models/Post");


module.exports = {
createComment: async (req, res) => {
    try {
      // COMMENTING FEATURE
      await Comment.create({
        comment: req.body.comment,
        likes: 0, 
        post: req.params.id,
        createdAt: req.body.createdAt,
      });
      await Post.findOneAndUpdate( 
        { _id: req.params.id },
        {
          $inc: { commentCount: 1 },
        }
      );
      console.log("Comment +1");
      console.log("Comment has been added!");
      res.redirect(`/post/${req.params.id}`); 
    } catch (err) {
      console.log(err);
    }
  }
}