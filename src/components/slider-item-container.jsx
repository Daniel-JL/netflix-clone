/* eslint-disable import/prefer-default-export */
import React, { useState, useRef, useEffect } from 'react';
import { SliderItem } from './slider-item';

export function SliderItemContainer(props) {
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

  const handleImgLoadingErr = () => {
    setImgLoadingErr(true);
  };

  const handleImgLoadedSuccess = () => {
    console.log('loadSuccess');

    setImgLoadedSuccess(true);
  };

  useEffect(() => {
    if (!imgLoaded) {
      console.log('useEffect');
      fetchUrlData();
    }
  });

  return (
    <SliderItem
      ageRating={ageRating.current}
      genres={genres.current}
      imgLoadedSuccess={imgLoadedSuccess}
      imgLoadingErr={imgLoadingErr}
      imgLoaded={imgLoaded}
      posterPath={posterPath.current}
      runtimeOrNumberOfSeasons={runtimeOrNumberOfSeasons.current}
      itemHoverActive={itemHoverActive}
      handleMouseOver={handleMouseOver}
      handleMouseOut={handleMouseOut}
      setImgLoadingErr={handleImgLoadingErr}
      setImgLoadSuccess={handleImgLoadedSuccess}
    />
  );
}

const mediaIsMovie = (mediaType) => mediaType === 'movie';

const moreThanOneSeason = (numberOfSeasons) => numberOfSeasons > 1;
