/* eslint-disable import/prefer-default-export */
import React, { useState, useRef, useEffect } from 'react';
import {
  useHistory,
} from 'react-router-dom';
import styled from 'styled-components';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { MotionBackground } from '../motion-background';
import { LocoRow } from '../slider/loco-row';
import { EpisodesAndInfoBoxContext } from '../context/episodes-and-info-box-context/episodes-and-info-box-context';
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

export function EpisodesAndInfoBox(props) {
  const history = useHistory();
  const ref = useRef();
  useOnClickOutside(ref, () => back());
  document.body.style.overflow = 'hidden';
  console.log(props);
  const back = () => {
    props.setScrollHidden();
    history.goBack();
    document.body.style.overflow = 'scroll';
  };
  return (
    <EpisodesAndInfoBoxContainer ref={ref}>
      <MotionBackground isEpsInfoBox={true}/>
      {props.mediaType === 'tv'
        && (
        <EpisodesListContainer
          mediaId={props.mediaId}
          numSeasons={props.runtimeOrNumberOfSeasons}
        />
        )}
      <MoreLikeThisBoxContainer
        mediaId={props.mediaId}
        mediaType={props.mediaType}
      />

    </EpisodesAndInfoBoxContainer>
  );
}
