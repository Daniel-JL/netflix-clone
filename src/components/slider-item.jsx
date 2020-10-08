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
  let location = useLocation();
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgLoadingErr, setImgLoadingErr] = useState(false);
  const [imgLoadedSuccess, setImgLoadedSuccess] = useState(false);
  const [itemHoverActive, setItemHoverActive] = useState(false);
  let posterPath = useRef('');
  let runtimeOrNumberOfSeasons = useRef('');
  let genres = useRef([]);
  let ageRating = useRef('');
  let ageRatingUrl = useRef(``);

  if (props.mediaType === 'movie') {
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
        ...Array(data.genres.length)
      ].map((value:undefined, index:number) => {
        return data.genres[index].name;
      });

      if (props.mediaType === 'movie') {
        runtimeOrNumberOfSeasons.current = data.runtime + 'm';
      } else {
        if(data.number_of_seasons > 1) {
          runtimeOrNumberOfSeasons.current = data.number_of_seasons + ' Seasons';
        } else {
          runtimeOrNumberOfSeasons.current = data.number_of_seasons + ' Season';
        }
      }
      setImgLoaded(true);
    })
    .catch((error) => {
      console.error('Error', error);
    });

    fetch(`https://api.themoviedb.org/3/${ageRatingUrl.current}?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      for(let i = 0; i < data.results.length; i++) {
        if (data.results[i].iso_3166_1 === "US") {
          if (props.mediaType === "movie") {
            ageRating.current = data.results[i].release_dates[0].certification;
          } else {
            ageRating.current = data.results[i].rating;
          }
          break;
        }
      }
      console.log(ageRating);
      
    })
    .catch((error) => {
      console.error('Error', error);
    });

  };

  const handleMouseOver = () => {
    if (imgLoadedSuccess) {
      setItemHoverActive((itemHoverActive) => true);
    }
  };

  useEffect(() => {
    if (!imgLoaded) {
      fetchUrlData();
    }
  });

  return (
    <ItemContainer
      onMouseOver={() => handleMouseOver()}
      onMouseOut={() => setItemHoverActive((itemHoverActive) => false)}
      active={itemHoverActive}
    >
      {imgLoaded && !imgLoadingErr
      && (
      <SliderItemImage
        alt="Slider image"
        src={posterPath.current}
        onError={() => setImgLoadingErr(true)}
        onLoad={() => setImgLoadedSuccess(true)}
      />
      )}
      {imgLoadedSuccess &&
      <div id="imgSuccess" data-testid="imgSuccess" />
      }
        <ItemDetails active={itemHoverActive}>
          <div id="buttons">
            <RoundPlayButton />
            <RoundPlusButton />
            <RoundThumbsUpButton />
            <RoundThumbsDownButton />
            
            <Link
              key={1}
              to={{
                pathname: `/browse/epsinfobox`,
                // This is the trick! This link sets
                // the `background` in location state.
                state: { background: location }
              }}
            >
              <RoundEpsAndInfoButton />
            </Link>
          </div>
          <div id="media-info">{ageRating.current} {runtimeOrNumberOfSeasons.current}</div>
          <div id="genres">{genres.current[0]} * {genres.current[1]}</div>
        </ItemDetails>
    </ItemContainer>
  );
}
