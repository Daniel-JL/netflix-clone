import React, { useState, useRef, useEffect } from 'react';
import {
  NavLink,
} from 'react-router-dom';
import styled from 'styled-components';
import { SliderItem } from './slider-item';
import { ArrowButton } from './buttons';
import { useFetch } from '../hooks/useFetch';

const SliderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ArrowButtonContainer = styled.div`
  height: 140px;
  width: 50px;
`;

export function Slider(props) {
  const [paginationPage, setPaginationPage] = useState(0);
  const [buttonHasBeenPressed, setButtonHasBeenPressed] = useState(false);
  const [numOfVisibleSliderItems, setNumOfVisibleSliderItems] = useState(6);
  const baseURL = 'https://api.themoviedb.org/3/';
  let url = ''.concat(baseURL, 'trending/all/week?page=1&api_key=', process.env.REACT_APP_MOVIE_DB_API_KEY);
  // let url = ''.concat(baseURL, props.genre, 'trending/all/week?api_key=', process.env.REACT_APP_MOVIE_DB_API_KEY);
  const mediaData = useFetch(url);
  const sliderItemProcessedDataIndex = useRef(0);
  console.log(mediaData);

  const mediaName = [];
  const imageId = [];
  const maturityRating = [];
  const numOfSeasons = [];

  const fetchSliderItemData = () => {
    
  }

  const processSliderItemData = () => {
    
  }

  useEffect(() => {
    //  TODO
    //  1. Have a way of checking if we need to load data on state change
    //  2. If we need to get data then fetch it and process it
  }, []);



  return(
    //  TODO 
    //  Get a bunch of movie deets and then pass props to 
    //  SliderItems so they can grab media they need
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
