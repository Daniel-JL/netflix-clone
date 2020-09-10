import React from 'react';
import {
  NavLink,
} from 'react-router-dom';
import styled from 'styled-components';

const ItemContainer = styled.div`
  height: 139px;
  width: 250px;
  border: 1px solid black;
`;

export function SliderItem() {
  return(
    <ItemContainer></ItemContainer>
  )
}