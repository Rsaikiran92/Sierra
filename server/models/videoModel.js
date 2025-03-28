const mongoose = require("mongoose");

const videoSchema = mongoose.Schema({
  title: String,
  description:String,
  filePath: String,
  fileSize: Number,
  userId: mongoose.Schema.Types.ObjectId,
  uploadedAt: { type: Date, default: Date.now },
});

const videoModel = mongoose.model("video", videoSchema);

module.exports = { videoModel };
