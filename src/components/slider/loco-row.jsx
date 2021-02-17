/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';
import {
  NavLink,
} from 'react-router-dom';
import styled from 'styled-components';
import LoadingSkeleton from '../loading-skeleton';
import { MediaSliderContainer } from './media-slider-container';

const RowContainer = styled.div`

`;



const RowPadding = styled.div`
  width: 100%;
  height: 3vw;
`;

const RowHeader = styled.header`
  width: 100%;
  margin-left: 4.5vw;
  font-size: 2vw;
  font-weight: bold;
  height: 2vw;
  color: white;
  z-index: 4;

`;

const Row = styled.div`
  position: relative;
  z-index: 0;
  height: 10vw;
  width: 100%;
  ${({ active }) => active && `
    z-index: 1;
  `}
`;

const SliderContainer = styled.div`
  visibility: hidden;

  ${({ imagesLoaded }) => imagesLoaded && `
      visibility: visible;
    `}
`;

const LocoRow = (
  {
    setModalProps,
    numSlidersLoaded,
    mediaType,
    genreName,
    genreId,
  },
) => {
  const [active, setActive] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const changeRowZIndex = (isActive) => {
    setActive((active) => isActive);
  };

  return (
    <RowContainer>
      <RowPadding />
      <RowHeader>
        {genreName}
      </RowHeader>
      <Row active={active}>
        {!imagesLoaded &&
          <LoadingSkeleton />
        }
        <SliderContainer imagesLoaded={imagesLoaded}>
          <MediaSliderContainer
            imagesLoaded={imagesLoaded}
            setModalProps={setModalProps}
            numSlidersLoaded={numSlidersLoaded}
            mediaType={mediaType}
            genreName={genreName}
            genreId={genreId}
            changeRowZIndex={changeRowZIndex}
            setImagesLoaded={setImagesLoaded}
          />
        </SliderContainer>
      </Row>
      <RowPadding />
    </RowContainer>
  );
};

export default LocoRow;