/* eslint-disable import/prefer-default-export */
import React, { useState, useRef } from 'react';
import {
  useHistory,
} from 'react-router-dom';
import styled from 'styled-components';
import { useOnClickOutside } from '../hooks/useOnClickOutside';

const EpisodesAndInfoBoxContainer = styled.div`
  position: absolute;
  height: 200px;
  width: 100%;
  background: #fff;
  // top: 200px;
  padding: 15;
  border: 2px solid #444;
  color: black;
`;

export function EpisodesAndInfoBox(props) {
  const history = useHistory();
  const ref = useRef();
  useOnClickOutside(ref, () => history.goBack());

  const back = () => {
    history.goBack();
  };

  return (
    <EpisodesAndInfoBoxContainer ref={ref}>
      TEEEEEEEEEEEEEEEEEEEEEEEEEEEST
    </EpisodesAndInfoBoxContainer>
  );
}
