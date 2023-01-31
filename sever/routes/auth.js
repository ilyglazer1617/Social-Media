const authRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

// Register
authRouter.post("/register", async (req, res) => {
  try {
    let hashedPassword = req.body.password; //! needs to be a string to be able to salt
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(hashedPassword, salt);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    await user.save();
    return res.status(200).send(user);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});
//login
authRouter.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send("user not found");
    console.log("body", req.body.password);
    console.log("fron db", user.password);
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return res.status(400).json("wrong password");

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = authRouter;
