import React from 'react';
import './VideoGrid.css'; 

const VideoGrid = ({ videos }) => {
  return (
    <div className="video-grid-container">
      {videos.map((video, index) => (
        <div key={index} className="video-item">
          <video controls className="grid-video">
            <source src={video.url} type="video/mp4" />
            Your browser does not support the video tag.
          
</video>
        </div>
      ))}
    </div>
  );
};

export default VideoGrid;