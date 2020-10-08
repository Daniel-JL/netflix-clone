/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';
import {
  useHistory,
} from 'react-router-dom';
import styled from 'styled-components';

const EpisodesAndInfoBoxContainer = styled.div`
  position: absolute;
  height: 200px;
  width: 100%;
  background: #fff;
  top: 200px;
  padding: 15;
  border: 2px solid #444;
  color: black;
`;

export function EpisodesAndInfoBox(props) {
  const history = useHistory();

  const back = () => {
    history.goBack();
  };

  return (
    <EpisodesAndInfoBoxContainer
      onClick={() => back()}
    >
      TEEEEEEEEEEEEEEEEEEEEEEEEEEEST
    </EpisodesAndInfoBoxContainer>
  );
}
