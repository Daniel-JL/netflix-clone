/* eslint-disable import/prefer-default-export */
import React, { useState, useRef, useEffect } from 'react';
import {
  NavLink,
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
  height: 139px;
  width: 250px;
  border: 1px solid black;
`;

const SliderItemImage = styled.img`
  width: 100%;
  height: 100%;
`;

export function SliderItem(props) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgLoadingErr, setImgLoadingErr] = useState(false);
  const [imgLoadedSuccess, setImgLoadedSuccess] = useState(false);
  const [itemHoverActive, setItemHoverActive] = useState(false);
  let posterPath = useRef('');
  let runtime = useRef('');
  let numberOfSeasons = useRef('');
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
        runtime.current = data.runtime;
      } else {
        numberOfSeasons.current = data.number_of_seasons;
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

  const handleMouseOut = () => {
    setItemHoverActive((itemHoverActive) => false);

  };
  useEffect(() => {
    if (!imgLoaded) {
      fetchUrlData();
    }

  });

  return (
    <ItemContainer
      onMouseOver={() => handleMouseOver()}
      onMouseOut={() => handleMouseOut()}
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
      {itemHoverActive &&
        <div>
          <div id="buttons">
            <RoundPlayButton />
            <RoundPlusButton />
            <RoundThumbsUpButton />
            <RoundThumbsDownButton />
            <RoundEpsAndInfoButton />
          </div>
          <div id="media-info">

          </div>
        </div>
      }
    </ItemContainer>
  );
}
