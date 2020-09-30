/* eslint-disable import/prefer-default-export */
import React, { useState, useRef, useEffect } from 'react';
import {
  NavLink,
} from 'react-router-dom';
import styled from 'styled-components';
import Slider from 'react-slick';
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

export function MediaSlider(props) {
  const [paginationPage, setPaginationPage] = useState(0);
  const [buttonHasBeenPressed, setButtonHasBeenPressed] = useState(false);
  const [numOfVisibleSliderItems, setNumOfVisibleSliderItems] = useState(6);
  const [dataLoaded, setDataLoaded] = useState(false);
  let movieTvShowIds = [];
  movieTvShowIds = useRef(movieTvShowIds.fill(React.createRef(), 0, 41));
  let movieTvShowType = [];
  movieTvShowType = useRef(movieTvShowType.fill(React.createRef(), 0, 41));
  const maxIdsNeeded = 42;
  const itemsPerPage = 20;
  const page = useRef(1);

  const fetchNow = () => {
    fetch(`https://api.themoviedb.org/3/trending/all/week?page=${page.current}&api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        for (let i = (0 + (page.current * 20 - 20)); i < (page.current * itemsPerPage); i++) {
          if (mediaIsMovieOrTv(data.results[i - ((page.current * 20) - 20)].media_type)) {
            movieTvShowIds.current[i] = data.results[i - (page.current * 20 - 20)].id;
            movieTvShowType.current[i] = data.results[i - ((page.current * 20) - 20)].media_type;
          }

          if (movieTvShowIds.current.length >= maxIdsNeeded) {
            setDataLoaded(true);
            break;
          }
        }
        if (movieTvShowIds.current.length < maxIdsNeeded) {
          page.current++;
          fetchNow();
        }
      });
  };

  useEffect(() => {
    if (!dataLoaded) {
      fetchNow();
    }
  }, []);

  return (
    <div>
      {dataLoaded
        && (
        <SliderContainer>
          <ArrowButtonContainer />

          <SliderItem mediaType={movieTvShowType.current[0]} mediaId={movieTvShowIds.current[0]} />
          <SliderItem mediaType={movieTvShowType.current[1]} mediaId={movieTvShowIds.current[1]} />
          <SliderItem mediaType={movieTvShowType.current[2]} mediaId={movieTvShowIds.current[2]} />
          <SliderItem mediaType={movieTvShowType.current[3]} mediaId={movieTvShowIds.current[3]} />
          <SliderItem mediaType={movieTvShowType.current[4]} mediaId={movieTvShowIds.current[4]} />
          <SliderItem mediaType={movieTvShowType.current[5]} mediaId={movieTvShowIds.current[5]} />
          <ArrowButtonContainer>
            <ArrowButton />
          </ArrowButtonContainer>
        </SliderContainer>
        )}
    </div>

  );
}

const mediaIsMovieOrTv = (item) => (item === 'movie' || item === 'tv');
