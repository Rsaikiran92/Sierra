const { videoModel } = require("../models/videoModel");

const update = async (req, res) => {
  try {
    console.log(req.file);
    const video = await new videoModel({
      title: req.body.title,
      description:req.body.description,
      filePath: req.file.path,
      fileSize: req.file.size,
      userId: req.user._id,
    });

    await video.save();
    res.status(201).json({ message: "Video uploaded successfully!", video });
  } catch (error) {
    res.status(500).json({ error: "Failed to upload video" });
  }
};

const videos = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const videoData = await videoModel.find({ userId: req.user._id });
    const paginatedVideos = videoData.slice(startIndex, endIndex);
    res.json({
      page: parseInt(page),
      limit: parseInt(limit),
      total: videoData.length,
      videos: paginatedVideos,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to get video" });
  }
};

const getVideoById = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await videoModel.findById(id); // Corrected method to findById
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve video" });
  }
};

module.exports = { update, videos, getVideoById };
