const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv"); //! מסתיר מידע סיסמאות ומפתחות env
const helmet = require("helmet"); //! helps us to stay safe simmeler to morgan
const morgan = require("morgan"); //! gives us info about our request to the server
const app = express();

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const messagesRoute = require("./routes/messages");
const converstionsRoute = require("./routes/converstions");
dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () =>
  console.log("connected to mongo DB")
);

app.use("/images", express.static(path.join(__dirname, "public/images"))); //! if you use the "/images" go stright to the dir name
//! middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
    // cb(null, req.body.name);
  },
});

const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    return res.status(200).send("file uploaded successfully");
  } catch (error) {
    console.log(error.message);
  }
});
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", converstionsRoute);
app.use("/api/messages", messagesRoute);

app.listen(4000, () => {
  console.log("backend Server on live !");
});
