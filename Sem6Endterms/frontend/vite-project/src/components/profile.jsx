import React from 'react';
import YouTube from 'react-youtube';

const UserProfileYouTube = ({ videoId, width = '100%', height = '360px' }) => {
  const opts = {
    height: height,
    width: width,
    playerVars: {
      autoplay: 0, 
    },
  };

  return (
    <div className="user-profile-youtube">
      <YouTube videoId={videoId} opts={opts} />
    </div>
  );
};

export default UserProfileYouTube;