const Router = require("express").Router();
const Conversation = require("../models/converstion");

//! new conv

Router.post("/", async (req, res) => {
  const newConversation = new Conversation({
    member: [req.body.senderId, req.body.receiverId],
  });
  try {
    const savedConversation = await newConversation.save();
    res.status(200).send(savedConversation);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
//! get conv of a user

Router.get("/:userId", async (req, res) => {
  // try {
  //   console.log(req.params.userId);
  //   const conversation = await Conversation.find({
  //     members: { $in: [req.params.userId] },
  //   });
  //   console.log(conversation);
  //   res.status(200).json(conversation);
  // } catch (error) {
  //   res.status(400).send(error.message);
  // }
  try {
    const conversation = await Conversation.find({
      member: { $in: [req.params.userId] },
    });
    console.log(conversation);
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = Router;
