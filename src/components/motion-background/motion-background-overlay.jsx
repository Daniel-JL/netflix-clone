/* eslint-disable import/prefer-default-export */
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import {
  NavLink,
  useLocation,
} from 'react-router-dom';
import ReactPlayer from 'react-player';
import { useFetch } from '../../hooks/useFetch';
import { getMediaData } from '../../helpers/getMediaData';
import getVideos from '../../helpers/getVideos';
import { 
  RectPlayButton, 
  RectInfoButton, 
  RoundMuteButton 
} from '../buttons';

const BillboardRow = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding-top: 30%;
  z-index: 3;
  color: white;
`;

const MediaTitleAndTagline = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 3vw;
`;

const MediaTitle = styled.div`
  font-size: 180%;
`;

const PlayAndInfoButtonsContainer = styled.div`
  display: flex;
  padding: 1vw;
`;

const Tagline = styled.div`

`;

const AgeRatingAndControl = styled.div`

`;

const MotionBackgroundOverlay = ({
  mediaId,
  mediaType,
  mediaTitle,
  mediaTagline,
  ageRating,
  isEpsInfoBox,
  handleMuteReplayButtonClick,
  handleInfoButtonClick,
  setPausePoint,
}) => { 
  const location = useLocation();

  return (
      <BillboardRow
        id="billboard-row"
        isEpsInfoBox={isEpsInfoBox}
        ref={setPausePoint}
      >
        <MediaTitleAndTagline>
          <MediaTitle>
            {mediaTitle}
          </MediaTitle>
          <Tagline>
            {mediaTagline}
          </Tagline>
          <PlayAndInfoButtonsContainer>
            <NavLink
              key={1}
              to="/watch"
            >
              <RectPlayButton>
              |> Play
              </RectPlayButton>
            </NavLink>
            
            {!isEpsInfoBox && 
              <NavLink
                key={2}
                to={{
                  pathname: `${location.pathname}/epsinfobox/${mediaType}/${mediaId}`,
                  state: { background: location },
                }}
              >
                <RectInfoButton onClick={handleInfoButtonClick}>
                  i More info
                </RectInfoButton>
              </NavLink>
            }
            
          </PlayAndInfoButtonsContainer>
        </MediaTitleAndTagline>
        <AgeRatingAndControl>
          <RoundMuteButton onClick={handleMuteReplayButtonClick} />
          {ageRating}
        </AgeRatingAndControl>

      </BillboardRow>
  );
};

export default MotionBackgroundOverlay;
