import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Added import
import axios from "axios";
import "./VideoList.css";

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [videosPerPage, setVideosPerPage] = useState(3);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate(); // Added useNavigate hook

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    axios
      .get(
        `http://localhost:8080/videos?page=${currentPage}&limit=${videosPerPage}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log(res);
        setVideos(res.data.videos);
        setTotalPages(Math.ceil(res.data.total / res.data.limit));
      })
      .catch((err) => console.error(err));
  }, [currentPage, videosPerPage]);

  return (
    <div className="video-list-container">
      <h2>Uploaded Videos</h2>

      <div className="pagination-limit">
        <label htmlFor="videosPerPage">Videos per page:</label>
        <input
          type="number"
          id="videosPerPage"
          value={videosPerPage}
          onChange={(e) => setVideosPerPage(Number(e.target.value))}
          min="1"
        />
      </div>
      {/* Display videos */}
      <div className="video-grid">
        {videos.map((video) => (
          <div
            key={video._id}
            className="video-item"
            onClick={() => navigate(`/videos/${video._id}`)} // Navigate on click
          >
            <video width="500px" height="200px">
              <source
                src={`http://localhost:8080/${video.filePath
                  .replace(/\\/g, "/")
                  .replace(/^\/+/, "")}`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
            <div className="video-details">
              <h3>{video.title}</h3>
              <p>{video.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination controls */}
      <div className="pagination-controls">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default VideoList;
