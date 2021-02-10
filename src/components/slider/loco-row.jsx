/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';

import {
  NavLink,
} from 'react-router-dom';
import styled from 'styled-components';
import { MediaSliderContainer } from './media-slider-container';

const RowContainer = styled.div`
`;

const PortalContainer = styled.div`
  z-index: 3;
`;

const RowPadding = styled.div`
  width: 100%;
  height: 45px;

`;

const RowHeader = styled.header`
  width: 100%;
  height: 36px;

`;

const Row = styled.div`
  position: relative;
  z-index: 0;
  height: 140px;
  width: 100%;

  ${({ active }) => active && `
    z-index: 1;

  `}
`;

export function LocoRow(
  {
    setModalProps,
    numSlidersLoaded,
    mediaType,
    genreName,
    genreId,
  },
) {
  const [active, setActive] = useState(false);

  const changeRowZIndex = (isActive) => {
    setActive((active) => isActive);
  };

  return (
    <RowContainer>
      <PortalContainer id="slider-item-modal" />
      <RowPadding />
      <RowHeader />
      <Row active={active}>
        <MediaSliderContainer
          setModalProps={setModalProps}
          numSlidersLoaded={numSlidersLoaded}
          mediaType={mediaType}
          genreName={genreName}
          genreId={genreId}
          changeRowZIndex={changeRowZIndex}
        />
      </Row>
      <RowPadding />
    </RowContainer>
  );
}
