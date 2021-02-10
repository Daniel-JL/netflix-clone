/* eslint-disable import/prefer-default-export */
import React, { useState, useRef, useEffect, createContext } from 'react';
import { SliderItem } from './slider-item';
import { getMediaData } from '../../helpers/getMediaData';
import { getAgeRating } from '../../helpers/getAgeRating';
import { EpisodesAndInfoBoxContext } from '../context/episodes-and-info-box-context/episodes-and-info-box-context';

export function SliderItemContainer({
  setModalProps,
  mediaType,
  mediaId,
  changeRowZIndex,
}) {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [imgLoadingErr, setImgLoadingErr] = useState(false);
  const [imgLoadedSuccess, setImgLoadedSuccess] = useState(false);
  const [itemHoverActive, setItemHoverActive] = useState(false);
  const [itemDimensions, setItemDimensions] = useState({});
  const posterPath = useRef('');
  const runtimeOrNumberOfSeasons = useRef('');
  const genres = useRef([]);
  const ageRating = useRef('');
  const ageRatingUrl = useRef('');

  if (mediaIsMovie(mediaType)) {
    ageRatingUrl.current = `movie/${mediaId}/release_dates`;
  } else {
    ageRatingUrl.current = `tv/${mediaId}/content_ratings`;
  }

  const fetchItemData = async () => {
    const data = await getMediaData(mediaType, mediaId);
    // console.log(data);
    posterPath.current = `http://image.tmdb.org/t/p/w780${data.backdrop_path}`;
    genres.current = [
      ...Array(data.genres.length),
    ].map((undefined, index) => data.genres[index].name);

    if (mediaIsMovie(mediaType)) {
      runtimeOrNumberOfSeasons.current = `${data.runtime}m`;
    } else {
      runtimeOrNumberOfSeasons.current = data.number_of_seasons;
    }

    ageRating.current = await getAgeRating(mediaId, mediaType);
    setDataLoaded(true);

  };

  const handleMouseOver = (itemContainerRef) => {
    if (imgLoadedSuccess) {
      let rect = itemContainerRef.getBoundingClientRect();
      console.log(rect);
      setItemDimensions((itemDimensions) => ({
        left: rect.x,
        top: rect.y + window.scrollY,
        width: rect.right - rect.left,
      }));

      setItemHoverActive(true);
      changeRowZIndex(true);
    }
  };

  const handleMouseOut = () => {
    setItemHoverActive(false);
    changeRowZIndex(false);
  };

  const handleImgLoadingErr = () => {
    setImgLoadingErr(true);
  };

  const handleImgLoadedSuccess = () => {
    setImgLoadedSuccess(true);
  };

  const handleEpsAndInfoButtonClick = () => {
    setModalProps(
      mediaId,
      mediaType,
      posterPath.current,
      runtimeOrNumberOfSeasons.current,
      genres.current,
      ageRating.current,
    );
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
      handleEpsAndInfoButtonClick={handleEpsAndInfoButtonClick}
      itemDimensions={itemDimensions}
    />
  );
}

const mediaIsMovie = (mediaType) => mediaType === 'movie';

const moreThanOneSeason = (numberOfSeasons) => numberOfSeasons > 1;
