/* eslint-disable import/prefer-default-export */
import React, { useState, useRef, useEffect } from 'react';
import {
  NavLink,
} from 'react-router-dom';
import styled from 'styled-components';
import Slider from 'react-slick';
import { SliderItem } from './slider-item';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './media-slider.css';
import { ArrowButton } from './buttons';
import { useFetch } from '../hooks/useFetch';

const SliderContainer = styled.div`
  display: block;
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
          <Slider 
          arrows={true}
          dots={false}
          infinite={true}
          speed={500}
          slidesToScroll={6}
          slidesToShow={6} 
          className={'slides'}
          >
            {
              [
                ...Array(maxIdsNeeded),
              ].map((value: undefined, index: number) => (
                <div>
                  <SliderItem mediaType={movieTvShowType.current[index]} mediaId={movieTvShowIds.current[index]} />
                </div>
              ))
            }
          </Slider>
        </SliderContainer>
        )}
    </div>

  );
  
}

const mediaIsMovieOrTv = (item) => (item === 'movie' || item === 'tv');
