const messageRouter = require("express").Router();
const Message = require("../models/Message");

//! add
messageRouter.post("/", async (req, res) => {
  const newMessage = new Message(req.body);
  try {
    const savedMessage = await newMessage.save();
    res.status(200).send(savedMessage);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//! get

messageRouter.get("/:conversationId", async (req, res) => {
  console.log(req.params.conversationId + "SHSHSHHSHSHSHS");
  try {
    const allmessages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).send(allmessages);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
module.exports = messageRouter;
