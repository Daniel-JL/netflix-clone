/* eslint-disable import/prefer-default-export */
import React, { useState, useRef, useEffect, createContext } from 'react';
import { SliderItem } from './slider-item';
import { getMediaData } from '../../helpers/getMediaData';
import { getAgeRating } from '../../helpers/getAgeRating';
import mediaIsMovie from '../../helpers/mediaIsMovie';
import { EpisodesAndInfoBoxContext } from '../context/episodes-and-info-box-context/episodes-and-info-box-context';

export function SliderItemContainer({
  setModalProps,
  mediaType,
  mediaId,
  changeRowZIndex,
  handleImageLoaded,
}) {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [imgLoadingErr, setImgLoadingErr] = useState(false);
  const [imgLoadedSuccess, setImgLoadedSuccess] = useState(false);
  const [itemHoverActive, setItemHoverActive] = useState(false);
  const [itemHoverTransition, setItemHoverTransition] = useState(true);
  const [itemDimensions, setItemDimensions] = useState({});
  const [mediaTitle, setMediaTitle] = useState();
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
    if (data.title) {
      setMediaTitle((mediaTitle) => data.title);
    } else if (data.name) {
      setMediaTitle((mediaTitle) => data.name);
    }
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
    console.log('mouseOver');
    if (imgLoadedSuccess) {
      let rect = itemContainerRef.getBoundingClientRect();
      setItemDimensions((itemDimensions) => ({
        left: rect.x,
        top: rect.y + window.scrollY,
        bottom: rect.bottom,
        right: rect.right,
        width: rect.right - rect.left,
        height: rect.bottom - rect.top,
      }));
      setItemHoverTransition(true);
      setItemHoverActive(true);
      changeRowZIndex(true);
    }
  };

  const handleMouseOut = () => {
    // const body = document.getElementById('react-root');
    // body.focus();
    console.log('mouseOut')
    setItemHoverTransition(false);

  };

  const handleModalDismount = () => {
    setItemHoverActive(false);
    changeRowZIndex(false);
  };

  const handleImgLoadingErr = () => {
    setImgLoadingErr(true);
  };

  const handleImgLoadedSuccess = () => {
    setImgLoadedSuccess(true);
    handleImageLoaded();
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
      mediaTitle={mediaTitle}
      mediaId={mediaId}
      mediaType={mediaType}
      ageRating={ageRating.current}
      genres={genres.current}
      imgLoadedSuccess={imgLoadedSuccess}
      imgLoadingErr={imgLoadingErr}
      dataLoaded={dataLoaded}
      posterPath={posterPath.current}
      runtimeOrNumberOfSeasons={runtimeOrNumberOfSeasons.current}
      itemHoverActive={itemHoverActive}
      itemHoverTransition={itemHoverTransition}
      handleMouseOver={handleMouseOver}
      handleMouseOut={handleMouseOut}
      handleModalDismount={handleModalDismount}
      setImgLoadingErr={handleImgLoadingErr}
      setImgLoadSuccess={handleImgLoadedSuccess}
      handleEpsAndInfoButtonClick={handleEpsAndInfoButtonClick}
      itemDimensions={itemDimensions}
    />
  );
}
