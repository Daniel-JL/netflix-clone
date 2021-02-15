/* eslint-disable import/prefer-default-export */
import React from 'react';
import {
  NavLink,
} from 'react-router-dom';
import styled from 'styled-components';
import Video from '../video';

const VideoPlayerContainer = styled.div`

`;

const VideoPlayer = () => (
  <VideoPlayerContainer>
    <Video />
  </VideoPlayerContainer>
);

export default VideoPlayer;
