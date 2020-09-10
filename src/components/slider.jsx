import React from 'react';
import {
  NavLink,
} from 'react-router-dom';
import styled from 'styled-components';
import { SliderItem } from './slider-item';
import { ArrowButton } from './buttons';

const SliderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ArrowButtonContainer = styled.div`
  height: 140px;
  width: 50px;
`;

export function Slider() {
  return(
    <SliderContainer>
      <ArrowButtonContainer />
      <SliderItem />
      <SliderItem />
      <SliderItem />
      <SliderItem />
      <SliderItem />
      <SliderItem />
      <ArrowButtonContainer>
        <ArrowButton />
      </ArrowButtonContainer>
    </SliderContainer>
  )
}
