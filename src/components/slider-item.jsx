/* eslint-disable import/prefer-default-export */
import React, { useState, useRef, useEffect } from 'react';
import {
  Link,
  useLocation,
} from 'react-router-dom';
import styled from 'styled-components';
import {
  RoundPlayButton,
  RoundPlusButton,
  RoundThumbsUpButton,
  RoundThumbsDownButton,
  RoundEpsAndInfoButton,
} from './buttons';

const ISliderItemProps = {
  mediaName: 'name',
  imageID: 1,
  maturityRating: 'rating',
  numOfSeasons: 1,

};

const ItemContainer = styled.div`
  position: relative;
  height: 139px;
  width: 250px;
  border: 1px solid black;
  transition: width 0.2s, height 0.2s;

  ${({ active }) => active && `
    width: 400px;
    height: 222px;
    z-index: 2;
  `}
`;

const SliderItemImage = styled.img`
  width: 100%;
  height: 100%;
`;

const ItemDetails = styled.div`
  visibility: hidden;
  background-color: gray;

  ${({ active }) => active && `
    visibility: visible;
  `}
`;

export function SliderItem(props) {
  const location = useLocation();
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgLoadingErr, setImgLoadingErr] = useState(false);
  const [imgLoadedSuccess, setImgLoadedSuccess] = useState(false);
  const [itemHoverActive, setItemHoverActive] = useState(false);
  const posterPath = useRef('');
  const runtimeOrNumberOfSeasons = useRef('');
  const genres = useRef([]);
  const ageRating = useRef('');
  const ageRatingUrl = useRef('');

  if (mediaIsMovie(props.mediaType)) {
    ageRatingUrl.current = `movie/${props.mediaId}/release_dates`;
  } else {
    ageRatingUrl.current = `tv/${props.mediaId}/content_ratings`;
  }

  const fetchUrlData = async () => {
    fetch(`https://api.themoviedb.org/3/${props.mediaType}/${props.mediaId}?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        posterPath.current = `http://image.tmdb.org/t/p/original${data.backdrop_path}`;
        genres.current = [
          ...Array(data.genres.length),
        ].map((undefined, index) => data.genres[index].name);

        if (mediaIsMovie(props.mediaType)) {
          runtimeOrNumberOfSeasons.current = `${data.runtime}m`;
        } else if (moreThanOneSeason(data.number_of_seasons)) {
          runtimeOrNumberOfSeasons.current = `${data.number_of_seasons} Seasons`;
        } else {
          runtimeOrNumberOfSeasons.current = `${data.number_of_seasons} Season`;
        }
        setImgLoaded(true);
      })
      .catch((error) => {
        console.error('Error', error);
      });

    fetch(`https://api.themoviedb.org/3/${ageRatingUrl.current}?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        for (let i = 0; i < data.results.length; i++) {
          if (data.results[i].iso_3166_1 === 'US') {
            if (props.mediaType === 'movie') {
              ageRating.current = data.results[i].release_dates[0].certification;
            } else {
              ageRating.current = data.results[i].rating;
            }
            break;
          }
        }
      })
      .catch((error) => {
        console.error('Error', error);
      });
  };

  const handleMouseOver = () => {
    if (imgLoadedSuccess) {
      setItemHoverActive(true);
    }
  };

  const handleMouseOut = () => {
    setItemHoverActive(false);
  };

  useEffect(() => {
    if (!imgLoaded) {
      fetchUrlData();
    }
  });

  return (
    <ItemContainer
      onMouseOver={props.handleMouseOver}
      onMouseOut={props.handleMouseOut}
      active={props.itemHoverActive}
    >

      {props.imgLoaded && !props.imgLoadingErr
      && (
      <SliderItemImage
        alt="Slider image"
        src={props.posterPath}
        onError={props.handleImgLoadingErr}
        onLoad={props.handleImgLoadedSuccess}
      />
      )}

      {imgLoadedSuccess
      && <div id="imgSuccess" data-testid="imgSuccess" />}

      <ItemDetails active={props.itemHoverActive}>
        <div id="buttons">
          <RoundPlayButton />
          <RoundPlusButton />
          <RoundThumbsUpButton />
          <RoundThumbsDownButton />
          <Link
            key={1}
            to={{
              pathname: '/browse/epsinfobox',
              state: { background: location },
            }}
          >
            <RoundEpsAndInfoButton>v</RoundEpsAndInfoButton>
          </Link>
        </div>
        <div id="media-info">
          {props.ageRating}
          {' '}
          {props.runtimeOrNumberOfSeasons}
        </div>
        <div id="genres">
          {props.genres[0]}
          {' '}
          *
          {' '}
          {props.genres[1]}
        </div>
      </ItemDetails>
    </ItemContainer>
  );
}

const mediaIsMovie = (mediaType) => {
  return mediaType === 'movie';
};

const moreThanOneSeason = (numberOfSeasons) => {
  return numberOfSeasons > 1;
};
