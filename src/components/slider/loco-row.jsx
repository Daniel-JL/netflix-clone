import React, { useState } from 'react';
import styled from 'styled-components';
import LoadingSkeleton from '../loading-skeleton';
import MediaSliderContainer from './media-slider-container';

const RowContainer = styled.div`

`;

const RowPadding = styled.div`
  width: 100%;
  height: 3vw;
`;

const RowHeader = styled.header`
  width: 100%;
  font-size: 2vw;
  font-weight: bold;
  height: 2vw;
  color: white;
  z-index: 4;

`;

const HeaderText = styled.div`
  padding-left: 4.5vw;
`;

const Row = styled.div`
  position: relative;
  z-index: 0;
  height: 10vw;
  width: 100%;
`;

const SliderContainer = styled.div`
  // visibility: hidden;

  // ${({ imagesLoaded }) => imagesLoaded && `
  //     visibility: visible;
  // `}
`;

const LocoRow = (
  {
    setModalProps,
    numSlidersLoaded,
    mediaType,
    genreName,
    genreId,
    handleItemLoaded,
  },
) => {
  

  return (
    <RowContainer>
      <RowPadding />
      <RowHeader>
        <HeaderText>
          {genreName}
        </HeaderText>
      </RowHeader>
      <Row>
        {/* {!imagesLoaded &&
          <LoadingSkeleton />
        } */}
        <SliderContainer>
          <MediaSliderContainer
            setModalProps={setModalProps}
            numSlidersLoaded={numSlidersLoaded}
            mediaType={mediaType}
            genreName={genreName}
            genreId={genreId}
            handleItemLoaded={handleItemLoaded}
          />
        </SliderContainer>
      </Row>
      <RowPadding />
    </RowContainer>
  );
};

export default LocoRow;
