const express = require("express");
const multer = require("multer");
const {
  update,
  videos,
  getVideoById,
} = require("../controller/videoController");

const videoRouter = express.Router();

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

videoRouter.post("/upload", upload.single("video"), update);
videoRouter.get("/videos", videos);
videoRouter.get("/videos/:id", getVideoById);

module.exports = { videoRouter };
