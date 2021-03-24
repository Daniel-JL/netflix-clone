import React from 'react';
import {
  useHistory,
} from 'react-router-dom';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import myVideo from '../../../assets/videos/cool-video.mp4';
import { RoundBackButton } from '../../common/buttons/buttons';

const VideoContainer = styled.div`
  width: 100%;
  position: absolute;
  z-index: 5;
`;

const ButtonContainer = styled.div`
  top: 5vw;
  left: 5vw;
  position: absolute;
  z-index: 2;
`;

const Video = () => {
  const history = useHistory();

  return (
    <VideoContainer>
      <ButtonContainer>
        <RoundBackButton onClick={() => history.goBack()} />
      </ButtonContainer>
      <ReactPlayer
        className="videoFrame"
        url={myVideo}
        playing
        controls={false}
        width="100%"
        height="100%"
      />
    </VideoContainer>
  );
  
  };

export default Video;
