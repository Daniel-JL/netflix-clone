/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';
import {
  NavLink,
  useLocation,
  useHistory,
  Link,
} from 'react-router-dom';
import styled from 'styled-components';

const EpisodesAndInfoBoxContainer = styled.div`
  width: 100%;
  height: 200px;
  background-color: black;
`;

export function EpisodesAndInfoBox(props) {
  let history = useHistory();
  let location = useLocation();

  const back = (e) => {
    e.stopPropagation();
    history.goBack();
  };

  return (
    <EpisodesAndInfoBoxContainer
      onClick={back}
    >
      
    </EpisodesAndInfoBoxContainer>
  );
}
