import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./VideoDetail.css"

const VideoDetail = () => {
  const { id } = useParams(); // Get video ID from URL
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    axios
      .get(`https://sierra-kf9e.onrender.com/videos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        setVideo(res.data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!video) return <div>Loading...</div>;

  return (
    <div className="video-detail-container">
      <div className="video-section" >
        <video width="350px"  controls>
          <source
          
            src={`https://sierra-kf9e.onrender.com/${video.filePath
              .replace(/\\/g, "/")
              .replace(/^\/+/, "")}`}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="info-section">
        <h2>Title</h2>
        <p>{video.title}</p>
        <h2 style={{marginTop:"20px"}}>Description</h2>
        <p>{video.description}</p>
      </div>
    </div>
  );
};

export default VideoDetail;
