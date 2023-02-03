const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../models/user");

//! get all users
// userRouter.get("/all", async (req, res) => {
//   const allUsers = await User.find();
//   res.send(allUsers);
// });

//!update
userRouter.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.params.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).send("acount has been update");
    } catch (error) {
      return res.status(400).send(error.message);
    }
  } else {
    return res.status(403).send("you can update your acount only");
  }
});

//! delete a user
userRouter.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.params.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).send("Account delted, good bye");
    } catch (error) {
      res.status(400).send(error.message);
    }
  } else {
    return res.status(400).send("dont be roude , delete only your account");
  }
});

//! get a user by id or user name
// userRouter.get("/", async (req, res) => {
//   const userId = req.query.userId;
//   const username = req.query.username;
//   try {
//     const user = userId
//       ? await User.findById(userId)
//       : await User.findOne({ username: username });
//     const { password, updateAt, ...other } = user._doc;
//     res.status(200).send(other);
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// });
userRouter.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});
//! get friends

userRouter.get("/friends/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).send(friendList);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
//! follow a user

userRouter.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).send("you are now following");
      } else {
        res
          .status(400)
          .send("it looks like you want to dubble follow this profile ");
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  } else {
    return res.status(400).send("you cant follow your self!");
  }
});

//! unfollow a profile
userRouter.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).send("not following this user any more");
      } else {
        return res.status(400).send("not following this profile ");
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  } else {
    return res.status(400).send("you cant follow your self!");
  }
});

module.exports = userRouter;
