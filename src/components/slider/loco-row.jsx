/* eslint-disable import/prefer-default-export */
import React from 'react';
import {
  NavLink,
} from 'react-router-dom';
import styled from 'styled-components';
import { MediaSliderContainer } from './media-slider-container';

const RowContainer = styled.div`
  z-index: 4;
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
  height: 140px;
  width: 100%;
`;

export function LocoRow(
  {
    setModalProps,
    mediaIdList,
    handleNewMediaIds,
    mediaType,
    genreName,
    genreId,
  },
) {
  return (
    <RowContainer>
      <RowPadding />
      <RowHeader />
      <Row>
        <MediaSliderContainer
          setModalProps={setModalProps}
          mediaIdList={mediaIdList}
          handleNewMediaIds={handleNewMediaIds}
          mediaType={mediaType}
          genreName={genreName}
          genreId={genreId}
        />
      </Row>
      <RowPadding />
    </RowContainer>
  );
}
