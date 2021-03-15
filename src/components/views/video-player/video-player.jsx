import React from 'react';
import styled from 'styled-components';
import Video from '../../main-page/video/video';

const VideoPlayerContainer = styled.div`

`;

const VideoPlayer = () => {
  //  EpsAndInfoBox removes scroll from main document body so that there is only 
  //  a scroll on the Modal. This sets the scroll again on the main page if coming
  //  from EpsAndInfoBox
  document.body.style.overflow = 'scroll';

  return (
    <VideoPlayerContainer>
      <Video />
    </VideoPlayerContainer>
  );
};

export default VideoPlayer;
