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
  movieTvShowIds = useRef(movieTvShowIds.fill(React.createRef(), 0, 41));
  let movieTvShowType = [];
  movieTvShowType = useRef(movieTvShowType.fill(React.createRef(), 0, 41));
  const maxIdsNeeded = 42;
  const itemsPerPage = 20;
  const page = useRef(1);

  const processSliderItemData = () => {

  };

  // const getSliderItemIds = async () => {
  //   try {
  //     fetchNow();
  //   } catch (e) {

  //   } finally {
  //     // console.log(movieTvShowIds);
  //   }
  // };

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
    //  TODO
    //  1. Have a way of checking if we need to load data on state change
    //  2. If we need to get data then fetch it and process it
    if (!dataLoaded) {
      fetchNow();
    }
  }, []);

  return (
    //  TODO
    //  Get a bunch of movie deets and then pass props to
    //  SliderItems so they can grab media they need
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
