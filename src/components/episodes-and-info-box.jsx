/* eslint-disable import/prefer-default-export */
import React, { useState, useRef, useEffect } from 'react';
import {
  useHistory,
} from 'react-router-dom';
import styled from 'styled-components';
import { useOnClickOutside } from '../hooks/useOnClickOutside';
import { MotionBackGroundEpsInfoBox } from './motion-background';
import { LocoRow } from './loco-row';
import { EpisodesAndInfoBoxContext } from './context/episodes-and-info-box-context/episodes-and-info-box-context';
import EpisodesListContainer from './episodes-list-container';
import RecommendedMovieBox from './recommended-movie-box';
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

export function EpisodesAndInfoBox(props) {
  const history = useHistory();
  const ref = useRef();
  useOnClickOutside(ref, () => back());
  document.body.style.overflow = 'hidden';

  const back = () => {
    props.setScrollHidden();
    history.goBack();
    document.body.style.overflow = 'scroll';
  };

  return (
    <EpisodesAndInfoBoxContainer ref={ref}>
      <MotionBackGroundEpsInfoBox />
      {global.sliderItemData.mediaType.current === 'movie'
        && <RecommendedMovieBox />}
      {global.sliderItemData.mediaType.current === 'tv'
        && (
        <EpisodesListContainer
          mediaId={global.sliderItemData.mediaId.current}
          numSeasons={global.sliderItemData.runtimeOrNumberOfSeasons.current}
        />
        )}
      <MoreLikeThisBoxContainer
        mediaId={global.sliderItemData.mediaId.current}
        mediaType={global.sliderItemData.mediaType.current}
      />

    </EpisodesAndInfoBoxContainer>
  );
}
