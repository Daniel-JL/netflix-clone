import React, { useState, useEffect } from 'react';
import {
  NavLink,
} from 'react-router-dom';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import myVideo from '../assets/videos/cool-video.mp4';

const Video = () => {
  const [videoFilePath, setVideoFileURL] = useState(null);

  return (
    <div>
      <ReactPlayer
        className="videoFrame"
        url={myVideo}
        playing
        controls={true}
        // playIcon={true}
        // onStart={() => handleVideoPlaying()}
        // onProgress={(played) => {
        //   if (played.played >= 0.94) {
        //     handleVideoEnded();
        //   }
        // }}
        width="100%"
        height="100%"
      />
    </div>
  );
  
  };

export default Video;