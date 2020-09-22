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
  const [dataLoaded, setDataLoaded] = useState(false);
  let movieTvShowIds = [];

  const mediaName = [];
  const imageId = [];
  const maturityRating = [];
  const numOfSeasons = [];

  const processSliderItemData = () => {

  };

  useEffect(() => {
    //  TODO
    //  1. Have a way of checking if we need to load data on state change
    //  2. If we need to get data then fetch it and process it
    if (!dataLoaded) {
      movieTvShowIds = fetchSliderItemIds();
      console.log(movieTvShowIds);
    }
  }, []);

  return (
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
  );
}

export const fetchSliderItemIds = () => {
  const maxIdsNeeded = 42;
  const itemsPerPage = 20;
  let page = 1;
  const idArr = [];

  const fetchNow = () => {
    fetch(`https://api.themoviedb.org/3/trending/all/week?page=${page}&api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        for (let i = 0; i < itemsPerPage; i++) {
          if (mediaIsMovieOrTv(data.results[i].media_type)) {
            idArr.push(data.results[i].id);
          }

          if (idArr.length >= maxIdsNeeded) {
            break;
          }
        }

        if (idArr.length < maxIdsNeeded) {
          page++;
          fetchNow();
        }
      });
  };
  fetchNow();
  return idArr;
};

const mediaIsMovieOrTv = (item) => (item === 'movie' || item === 'tv');
