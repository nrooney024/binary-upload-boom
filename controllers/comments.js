const Post = require("../models/Post");
const Comments = require("../models/Comments");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      const comments = await Comments.find({ user: req.params.id }).sort({createdAt: "desc"}).lean();
      res.render("profile.ejs", { posts: posts, user: req.user, comments: comments });
    } catch (err) {
      console.log(err);
    }
  },
  createComments: async (req, res) => {
    try {
      
      await Comments.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
      });
      console.log("Comments has been added!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  }
};
