import React, { useState, useRef } from "react";
import axios from "axios";
import "./VideoUpload.css";

const VideoUpload = () => {
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const fileInputRef = useRef(null); // Add ref for file input

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Title and description are required.");
      return;
    }

    const formData = new FormData();
    formData.append("video", video);
    formData.append("title", title);
    formData.append("description", description);

    try {
      setIsLoading(true); // Set loading to true
      const token = localStorage.getItem("authToken");
      const res = await axios.post(
        "https://sierra-kf9e.onrender.com/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Video uploaded successfully!");
      setVideo(null); // Clear video input
      fileInputRef.current.value = ""; // Reset file input
      setTitle(""); // Clear title input
      setDescription(""); // Clear description input
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setIsLoading(false); // Set loading to false
    }
  };

  return (
    <div>
      <div className="video-upload-container">
        <h2>Upload Video</h2>
        <form onSubmit={handleUpload}>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
            required
            ref={fileInputRef} // Attach ref to file input
          />
          <input
            type="text"
            placeholder="Enter video title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Enter video description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VideoUpload;
