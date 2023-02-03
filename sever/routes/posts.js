const postRouter = require("express").Router();
const Post = require("../models/post");
const { updateOne } = require("../models/user");
const User = require("../models/user");
const { post } = require("./users");
const { Types } = require("mongoose");
//create a post
postRouter.post("/", async (req, res) => {
  // req.body.postBy = Types.ObjectId(req.body.postBy);
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();

    res.status(200).send(savedPost);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//update a post

postRouter.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).send("post has been updated");
    } else {
      res.status(400).send("you can only update your personal post");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//delete a post
postRouter.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).send("post has been deleted");
    } else {
      res.status(400).send("you can delete only your post");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//like and unlike a post
postRouter.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).send("like added to the post");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).send("post unliked");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});
//get a post
postRouter.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).send(post);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
//get timeline posts and finde all user posts and concat them
postRouter.get("/timeLine/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id }).populate(
      "postBy"
    );

    const friendPosts = await Promise.all(
      currentUser.followings.map(async (friendId) => {
        return await Post.find({ userId: friendId }).populate("postBy");
      })
    );
    res.status(200).send(userPosts.concat(...friendPosts));
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

// get user's all posts
postRouter.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id }).populate("postBy");
    console.log(posts);

    // const posts = await Post.find({ username: req.params?.username });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = postRouter;
