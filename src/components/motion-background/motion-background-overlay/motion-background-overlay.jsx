/* eslint-disable import/prefer-default-export */
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import {
  NavLink,
  useLocation,
} from 'react-router-dom';
import {
  RectPlayButton,
  RectInfoButton,
  RoundMuteButton,
} from '../../common/buttons/buttons';

const BillboardRow = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding-top: 30%;
  z-index: 3;
  color: white;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;

`;

const InfoAndButtons = styled.div`
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
  vidExists,
  videoEnded,
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
      <InfoAndButtons>
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
              &#9654; Play
            </RectPlayButton>
          </NavLink>

          {!isEpsInfoBox
              && (
              <NavLink
                key={2}
                to={{
                  pathname: `${location.pathname}/epsinfobox/${mediaType}/${mediaId}`,
                  state: { background: location },
                }}
              >
                <RectInfoButton onClick={handleInfoButtonClick}>
                  &#9432; More info
                </RectInfoButton>
              </NavLink>
              )}
        </PlayAndInfoButtonsContainer>
      </InfoAndButtons>
      <AgeRatingAndControl>
        {vidExists
          && (
          <RoundMuteButton
            videoEnded={videoEnded}
            onClick={handleMuteReplayButtonClick}
          />
          )}

        {ageRating}
      </AgeRatingAndControl>
    </BillboardRow>
  );
};

export default MotionBackgroundOverlay;
