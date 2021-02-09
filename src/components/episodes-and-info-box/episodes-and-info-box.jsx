/* eslint-disable import/prefer-default-export */
import React, { useState, useRef, useEffect } from 'react';
import {
  useHistory,
} from 'react-router-dom';
import styled from 'styled-components';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { MotionBackground } from '../motion-background';
import EpisodesListContainer from './episodes-list-container';
import MoreLikeThisBoxContainer from './more-like-this-box-container';

const EpisodesAndInfoBoxContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  // align-self: center;
  // justify-content: center;
  // align-items: center;
  // margin: auto;
  width: 50%;
  background: #fff;
  border: 2px solid #444;
  color: black;
  top: 20px;

`;

export function EpisodesAndInfoBox({
  mediaId,
  mediaType,
  posterPath,
  runtimeOrNumberOfSeasons,
  genres,
  ageRating,
  setScrollHidden,
}) {
  const history = useHistory();
  const ref = useRef();
  useOnClickOutside(ref, () => back());
  document.body.style.overflow = 'hidden';
  const back = () => {
    setScrollHidden();
    history.goBack();
    document.body.style.overflow = 'scroll';
  };

  return (
    <EpisodesAndInfoBoxContainer ref={ref}>
      <MotionBackground
        isEpsInfoBox={true}
        mediaType={mediaType}
        mediaId={mediaId}
      />
      {mediaType === 'tv'
        && (
        <EpisodesListContainer
          mediaId={mediaId}
          numSeasons={runtimeOrNumberOfSeasons}
        />
        )}
      <MoreLikeThisBoxContainer
        mediaId={mediaId}
        mediaType={mediaType}
      />

    </EpisodesAndInfoBoxContainer>
  );
}
