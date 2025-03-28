const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
const cors = require("cors");
const { userRouter } = require("./routes/userRouter");
const { videoRouter } = require("./routes/videoRouter");
const { authMiddleware } = require("./middleware/AuthMiddleware.js");

const app = express();
env.config();
const port = process.env.port || 8080;

app.use(cors());
app.use(express.json());
app.use("/", userRouter);
app.use("/uploads", express.static("uploads"));
app.use("/", authMiddleware, videoRouter);

app.get("/", (req, res) => {
  res.send("welcome to the server");
});

app.listen(port, async () => {
  try {
    await mongoose.connect(process.env.mongoUrl);
    console.log("connected to the database");
  } catch (error) {
    console.error("error in connecting to the database");
  }
  console.log(`server is running  on ${port} port`);
});
