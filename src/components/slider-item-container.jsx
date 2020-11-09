/* eslint-disable import/prefer-default-export */
import React, { useState, useRef, useEffect, createContext } from 'react';
import { SliderItem } from './slider-item';
import { getMediaData } from '../helpers/getMediaData';
import { getAgeRating } from '../helpers/getAgeRating';
import { EpisodesAndInfoBoxContext } from './context/episodes-and-info-box-context/episodes-and-info-box-context';

export function SliderItemContainer(props) {
  const [dataLoaded, setDataLoaded] = useState(false);
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

  const fetchItemData = async () => {
    const data = await getMediaData(props.mediaType, props.mediaId);

    posterPath.current = `http://image.tmdb.org/t/p/w780${data.backdrop_path}`;

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

    ageRating.current = await getAgeRating(ageRatingUrl.current, props.mediaType);
    setDataLoaded(true);

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
    setImgLoadedSuccess(true);
  };

  useEffect(() => {
    if (!dataLoaded) {
      fetchItemData();
    }
  });

  return (
    <SliderItem
      ageRating={ageRating.current}
      genres={genres.current}
      imgLoadedSuccess={imgLoadedSuccess}
      imgLoadingErr={imgLoadingErr}
      dataLoaded={dataLoaded}
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
