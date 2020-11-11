/* eslint-disable import/prefer-default-export */
import React, { useState, useRef, useContext } from 'react';
import {
  useHistory,
} from 'react-router-dom';
import styled from 'styled-components';
import { useOnClickOutside } from '../hooks/useOnClickOutside';
import { MotionBackground } from './motion-background';
import { LocoRow } from './loco-row';
import { EpisodesAndInfoBoxContext } from './context/episodes-and-info-box-context/episodes-and-info-box-context';

const EpisodesAndInfoBoxContainer = styled.div`
  position: absolute;
  align-self: center;
  justify-content: center;
  margin: auto;
  width: 80%;
  background: #fff;
  border: 2px solid #444;
  color: black;
  top: 20px;

`;

export function EpisodesAndInfoBox(props) {
  const history = useHistory();
  const ref = useRef();
  const context = useContext(EpisodesAndInfoBoxContext);
  useOnClickOutside(ref, () => back());
  document.body.style.overflow = 'hidden';
  console.log(global.sliderItemData);

  const back = () => {
    props.setScrollHidden();
    history.goBack();
    document.body.style.overflow = 'scroll';
  };

  return (
    <EpisodesAndInfoBoxContainer ref={ref}>
      <MotionBackground />
      {/* <LocoRow />
      <LocoRow />
      <LocoRow /> */}
    </EpisodesAndInfoBoxContainer>
  );
}
