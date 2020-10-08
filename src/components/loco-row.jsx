/* eslint-disable import/prefer-default-export */
import React from 'react';
import {
  NavLink,
} from 'react-router-dom';
import styled from 'styled-components';
import { MediaSlider } from './media-slider';

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

export function LocoRow() {
  return (
    <RowContainer>
      <RowPadding />
      <RowHeader />
      <Row>
        <MediaSlider />
      </Row>
      <RowPadding />
    </RowContainer>
  );
}
