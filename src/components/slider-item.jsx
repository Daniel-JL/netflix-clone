import React from 'react';
import {
  NavLink,
} from 'react-router-dom';
import styled from 'styled-components';

const ISliderItemProps = {
  mediaName: "name",
  imageID: 1,
  maturityRating: "rating",
  numOfSeasons: 1,

};

const ItemContainer = styled.div`
  height: 139px;
  width: 250px;
  border: 1px solid black;
`;

export function SliderItem(props) {
  
  return(
    <ItemContainer></ItemContainer>
  )
}